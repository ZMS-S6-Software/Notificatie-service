import { connect } from 'amqplib';


const connection = await connect(`amqp://${process.env.RABBITMQ_HOST || 'localhost'}`);

const channel = await connection.createChannel();
const queue = 'uploadedvideo';
await channel.assertQueue(queue, { durable:false });

channel.consume(queue, (msg) => {
  try {
    const receivedMsg = JSON.parse(msg.content.toString());
    if (receivedMsg.title === 'uploadedvideo') {
      console.log(receivedMsg)
      channel.ack(msg);
    }
  } catch (error) {
    console.error(`Error parsing message: ${error.message}`);
    channel.reject(msg, true);
  }
});

// api calls
export default function (app) {
    app.get("/test", async (req, res) => {
        res.json('test123123123123');
    });
  }
  
