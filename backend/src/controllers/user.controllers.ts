import { Request, Response } from "express";
import contentModel from "../models/content";
import z from "zod"
import linkModel from "../models/link";
import { random } from "../utils/utils";
import userModel from "../models/user";


const createContentSchema = z.object({
    title: z.string().min(3).max(50),
    link: z.string().url().max(500),
    description: z.string()
})


const deleteContentSchema = z.object({
    contentId: z.string(),
})

const createShareLinkSchema = z.object({
    share: z.boolean(),
})

const getSharedContentSchema = z.object({
    shareLink: z.string()
})





export async function createContent(req: Request, res: Response) {


    const result = createContentSchema.safeParse(req.body)

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs",
            result
        })
        return
    }

    const { title, link, description } = result.data;


    try {
        const data = await contentModel.create({
            title,
            link,
            description,
            tags: [],
            userId: req.userId,
        })

        res.status(200).json({
            result: data,
            message: "Added Successfully"
        })


    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }
}

export async function getContent(req: Request, res: Response) {

    const userId = req.userId;

    try {
        const content = await contentModel.find({
            userId
        })

        res.status(200).json({
            content,
            message: "Success"
        })

    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }

}

export async function deleteContent(req: Request, res: Response) {
    console.log(req.params)
    const result = deleteContentSchema.safeParse(req.params)

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs",
            result
        })
        return
    }

    const { contentId } = result.data;
    try {

        const deletedContent = await contentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        })

        res.status(200).json({
            message: "Content deleted successfully",
            deletedContent
        })


    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }

}

export async function createShareLink(req: Request, res: Response) {

    const result = createShareLinkSchema.safeParse(req.body);

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs",
            result
        })
        return
    }

    const { share } = result.data;

    try {
        const hash = random(10)
        if (share) {
            const existingLink = await linkModel.findOne({
                userId: req.userId
            })

            if (existingLink) {
                res.json({
                    message: "/share/" + existingLink.hash
                })
                return
            }

            await linkModel.create({
                userId: req.userId,
                hash

            })
            res.json({
                message: "/share/" + hash
            })
            return


        }

        else {
            await linkModel.deleteOne({
                userId: req.userId
            });
            res.json({
                message: "Removed sharable link"
            })
            return
        }

    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }
}

export async function getSharedContent(req: Request, res: Response) {
    const result = getSharedContentSchema.safeParse(req.params);

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs",
            result
        })
        return
    }

    const hash = result.data.shareLink;

    try {
        // First, get the link data to find the user
        const linkData = await linkModel.findOne({
            hash
        });

        if (!linkData) {
            res.status(404).json({
                message: "Share link not found"
            });
            return;
        }

        // Get the user's content
        const content = await contentModel.find({
            userId: linkData.userId
        });

        // Get user info (without sensitive data)
        const user = await userModel.findById(linkData.userId).select('username email');

        res.status(200).json({
            content,
            user,
            message: "Shared content fetched successfully"
        });

    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        });
    }
}