
const { PrismaClient } = require("@prisma/client");
const router = require("express").Router();

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const user = await prisma.Campaigns.findMany({})
    res.json(user)
})

router.get('/:id', async (req, res) => {
    await prisma.Campaigns.findFirst({
        where: {
            id: Number(req.params.id)
        }
    }).then(async (res) => {
        console.log(res,"res")
        await prisma.Campaigns.update({
            data: {
                opens: res.opens + 1
            },
            where: {
                id: Number(req.params.id)
            }
        })
    })
    const user = await prisma.Campaigns.findFirst({
        where: {
            id: Number(req.params.id)
        }
    })
    res.json(user)
})

router.post('/', async (req, res, next) => {
    const createdData = await prisma.Campaigns.create({
        data: req.body
    })
    res.json(createdData)
})

router.put('/:id', async (req, res) => {
    await prisma.Campaigns.findFirst({
        where: {
            id: Number(req.params.id)
        }
    }).then(async (response) => {
            const updateData = await prisma.Campaigns.update({
                data: {
                    clicks: response.clicks + 1
                },
                where: {
                    id: Number(req.params.id)
                }
            })
            res.json(updateData)
        })
})

router.delete('/:id', async (req, res) => {
    const deleteData = await prisma.Campaigns.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.send(deleteData)
})

module.exports = router;
