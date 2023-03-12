

const runSocket = () => {

    const io = require('socket.io')(3001, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST']
        }
    });

    // pulls in document schema
    const Document = require('./models/Document');
    
    const Gadget = require('./models/Gadget');
    
    const defaultValue = 'Brand new baby!'
    
    async function handleDoc(id, owner, songTitle) {
        if (id == null) return
    
        //look for existing document
        const existingDoc = await Document.findById(id)
    
        //if found, return it
        if (existingDoc) return existingDoc
    
        //if not found, create a new document
        return await Document.create({ _id: id, data: defaultValue, owner: owner, title: songTitle })
    
    }
    
    io.on('connection', socket => {
        console.log('Socket connected');
        socket.on('get-document', async (documentId, owner, songTitle )=> {

            console.log('documentId:',documentId);

            //brings back doc or creates new one
            const quillDoc = await handleDoc(documentId, owner, songTitle)
            
            //joins the room
            socket.join(documentId)

            //loads the data into the quill editor
            socket.emit('load-document', quillDoc.data)

            // socket.emit('load-document', '')
            console.log('quillDoc: ',quillDoc)
            
            socket.on('send-changes', delta => {
                socket.broadcast.to(documentId).emit('receive-changes', delta);
            })
            
            socket.on('save-document', async data => {
                console.log('data: ',data);
                await Document.findByIdAndUpdate(documentId, { data })
            })

            socket.on('set-title', async songTitle => {
                console.log('Song Title: ',songTitle);
                await Document.findByIdAndUpdate(documentId, { title: songTitle })
                socket.broadcast.to(documentId).emit('receive-title', songTitle);
            })

            socket.on('search-docs', async id => {
                console.log('Searching: ',id);
                const result = await Document.findById(id)
                console.log('Result: ',result.title, result.owner);
            })
            socket.on('make-gadget', async color => {
                console.log('Making', color, 'gadget');
                return await Gadget.create({ color: color, shape: 'square', weight: {bottom: 'heavy', top: 'heavy'}, name: `${color}Shape` })
            })
        })
    })

}

module.exports = runSocket;