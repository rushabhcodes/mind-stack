import { Request, Response } from "express";
import contentModel from "../models/content";
import z, { boolean } from "zod"
import linkModel from "../models/link";
import { random } from "../utils/utils";


const createContentSchema = z.object({
    title: z.string().min(3).max(50),
    link: z.string().url().max(100),
    userId: z.string()
})

const getContentSchema = z.object({
    userId: z.string()
})

const deleteContentSchema = z.object({
    contentId: z.string(),
    userId: z.string()
})

const createShareLinkSchema = z.object({
    share: z.boolean(),
    userId: z.string()
})

const getsharedLinkSchema = z.object({
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

    const { title, link, userId } = result.data;


    try {
        await contentModel.create({
            title,
            link,
            tags: [],
            userId,
        })


    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }
}

export async function getContent(req: Request, res: Response) {

    const result = getContentSchema.safeParse(req.body)

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs",
            result
        })
        return
    }

    const userId = result.data.userId;

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

    const result = deleteContentSchema.safeParse(req.body)


    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs",
            result
        })
        return
    }

    const { contentId, userId } = result.data;
    try {

        const deletedContent = await contentModel.deleteOne({
            _id: contentId,
            userId
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

    const { userId, share } = result.data;

    try {
        const hash = random(10)
        if (share) {
            const existingLink = await linkModel.findOne({
                userId
            })

            if (existingLink) {
                res.json({
                    message: "/share" + existingLink.hash
                })
                return
            }

            await linkModel.create({
                userId,
                hash

            })
            res.json({
                message: "/share" + hash
            })
            return


        }

        else {
            await linkModel.deleteOne({
                userId
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


export async function getsharedLink(req: Request, res: Response) {

    const result = getsharedLinkSchema.safeParse(req.params);

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs",
            result
        })
        return
    }

    const hash = result.data.shareLink
    console.log(hash);


    try {

        const response = await linkModel.findOne({
            hash
        }).populate("userId")

        console.log(response)

        res.status(200).json({
            response,
            message: "Fetched data"
        })



    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }

}
