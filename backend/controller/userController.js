const Editor = require('../model/userModel');
const io = require('../socket');

exports.getRoomName = (req, res, next) => {
    const roomName = Math.round((Math.pow(36, 6 + 1) - Math.random() * Math.pow(36, 6))).toString(36).slice(1);
    res.json({ roomName: roomName });
}

exports.joinRoom = (req, res, next) => {
    const roomName = Math.round((Math.pow(36, 6 + 1) - Math.random() * Math.pow(36, 6))).toString(36).slice(1);
    res.json({ roomName: roomName });
}

exports.updateCode = (req, res, next) => {
    // Editor.findById('5f9978c755845f1ef4f58dae')
    //     .then(el => {
    //         el.content = req.body.content;
    //         return el.save();
    //     })
    //     .then(result => {
    //         // io.getIo().emit('editorContent', { action: 'update', result: result });
    //         io.getIo().sockets.emit('broadcast',{result: result});
    //         res.status(201).json({message:"Content Updated", result:result});
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // io.getIo().emit('updateEd', { result: req.body.content });
    res.status(201).json({ message: "Content Updated", result: req.body.content });
}