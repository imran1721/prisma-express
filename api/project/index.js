
const { PrismaClient } = require("@prisma/client");
const router = require("express").Router();

const prisma = new PrismaClient()

router.get('/',async (req, res) => {
    const user = await prisma.project_table.findMany({
        include: {Campaigns: true,}
    })
    res.json(user)
})

router.get('/:id',async (req, res) => {
    const user = await prisma.projct_table.findFirst({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json(user)
})

router.post('/', async(req, res, next) => {
    const createdData = await prisma.project_table.create({
        data:req.body
    })
    res.json(createdData)
})

router.put('/:id', async(req, res)=>{
    const updateData = await prisma.project_table.update({
        data: req.body,
        where:{
            id:Number(req.params.id)
        }
    })
    res.json(updateData)
})

router.delete('/:id', async(req, res) => {
    const deleteData = await prisma.project_table.delete({
        where:{
            id:Number(req.params.id)
        }
    })
    res.send(deleteData)
})

module.exports = router;