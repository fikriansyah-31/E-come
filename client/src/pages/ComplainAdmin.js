import React, { useState, useEffect, useContext } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { Container, Row, Col } from 'react-bootstrap'
import Contact from '../components/Form Complain/Contact'
import { UserContext } from '../context/userContext'
 import {io} from 'socket.io-client'
import Chat from '../components/Form Complain/Chat'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
 
    const [messages, setMessages] = useState([])


    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

  
    const [state, dispatch] = useContext(UserContext)


    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
       
            query: {
                id: state.user.id
            }
        })

     
        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })

     
        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) 

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
         
            let dataContacts = data.filter((item)=>(item.status!=='admin') && (item.recipientMessage.length  >0||item.senderMessage.length>0))
            
         
            dataContacts = dataContacts.map((item)=>({
                ...item,
                
            }))
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
      
        socket.emit("load messages",data.id)
    }

    // code here
    const loadMessages = (value) => {
            
        socket.on("messages", (data)=>{
            if(data.length>0){
                const dataMessages = data.map((item)=>({
                    idSender:  item.sender.id,
                    message: item.message
                }))
                console.log(dataMessages);
                setMessages(dataMessages)
            }
            loadContacts()
            const chatMessages = document.getElementById("chat-messages")
            chatMessages.scrollTop = chatMessages?.scrollHeight
        })
    }

    const onSendMessage = (e)=>{
        if(e.key === 'Enter'){
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit("send messages",data)
            e.target.value = ""
        }
    }

    return (
        <>
            <NavbarAdmin title={title} />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9}>
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    
                    </Col>
                </Row>
            </Container>
        </>
    )
}