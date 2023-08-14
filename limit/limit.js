import  rateLimit  from "express-rate-limit";

export let configGET = ()=>{
    return rateLimit({
    windowMs: 30 *1000,
    max: 5,
    standardHeaders:true,
    legacyHeaders:false,
    skip: (req,res)=>{
        if (req.headers["content-length"]>300) {
            res.status(413).send({
                status:413,
                message:"El tamaño es incorrecto"
            });
            return true;
        }
    },
    message: (reeq, res)=>{
        res.status(429).send({
            status:429,
            message: "Ya se acabo su tiempo"
        })
    }
});}

