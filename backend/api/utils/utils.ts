export function random(num: number){
 let options = "qwertyuiopasdfghjklzxcvbnm123456789";
    let length = options.length

    let ans = "";

    for (let i = 0 ; i < num ; i++){
        ans += options[Math.floor(Math.random()*options.length)]
    }

    return ans
}