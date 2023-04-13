const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const Checklist = db.checklist;
const ChecklistItem = db.checklistItem;

exports.getChecklist = async(req, res) => {
    try {
        const data = await Checklist.findAll();
        return res.json({ data });
      } catch (error) {
        return res.status(500).json(error);
      }
}
exports.add = async(req, res) => {
    try {
        const data = {
            id:uuidv4(),
            name:req.body.name
        }
        return await Checklist.create(data)
        .then((item) => 
            res.status(201).json({ message: 'success', data: item })
        ).catch((err) => 
            res.status(400).json({ message: err.message, data: null })
        );
      } catch (error) {
        return res.status(500).json(error);
      }
}
exports.delete = async(req, res) => {
    try {
        const { id } = req.params;
        return await Checklist.destroy({ where: { id } })
          .then((item) => { 
            if (item) { 
                res.status(201).json({ message: 'success' });
             } 
        }).catch((err) =>
             res.status(400).json({ message: err.message, data: null })
        );
      } catch (error) {
        return res.status(500).json(error);
      }
}
exports.getItemAll = async(req, res) => {
    try {
        const data = await Checklist.findByPk(req.params.id,{include:[{
            model:ChecklistItem,
            as:"items"
        }]});
        return res.json({data:data.items});
      } catch (error) {
        return res.status(500).json(error.message);
      }
}
exports.addItem = async(req, res) => {
    try {
        const { id } = req.params;
        const { item_name } = req.body;
        const data = {
          id:uuidv4(),
          item_name,
          status: false,
          checklist_id: id,
        };
        return await ChecklistItem.create(data)
          .then((item) =>
             res.status(201).json({ message: 'success', data: item })
            ).catch((err) => 
                res.status(400).json({ message: err.message, data: null })
            );
      } catch (error) {
        return res.status(500).json(error);
      }
}
exports.getItemById = async(req, res) => {
    try {
        const { id, item } = req.params;
        const data = await ChecklistItem.findOne({
          where: { checklist_id: id, id: item },
        });
        
        return res.json({ data: data });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
}
exports.setStatusById = async(req, res) => {
    try {
        const { id, item } = req.params;
        return await ChecklistItem.findOne({ where: { checklist_id: id, id: item }, attributes: { include: ['status'] } })
          .then(async (data) => {
            await ChecklistItem.update(
              { status: !data.dataValues.status },
              { where: { checklist_id: id, id: item } },
            ).then((err) => {
              res.json({ message: 'update status is success' });
            })
              .catch((err) => 
              res.status(400).json({ err })
              );
          }).catch((err) => 
          res.status(400).json({ err })
          );
      } catch (error) {
        return res.status(500).json(error);
      }
}
exports.deleteItemById = async(req, res) => {
    try {
        const { id, item } = req.params;
        return await ChecklistItem.destroy({ where: { id:item } })
          .then((item) => { 
            if (item) {
                 res.status(201).json({ message: 'success' }); 
            } 
            }) .catch((err) => 
            res.status(400).json({ message: err.message, data: null })
            );
      } catch (error) {
        return res.status(500).json(error);
      }
}
exports.renameItemById = async(req, res) => {
    try {
        const { id, item } = req.params;
        const { item_name } = req.body;
        return await ChecklistItem.update({ item_name }, { where: { checklist_id: id, id: item } })
          .then((item) => 
            res.json({ message: 'success' })
            )
          .catch((err) => 
            res.status(400).json({ err })
          );
      } catch (error) {
        return res.status(500).json(error);
      }
}

