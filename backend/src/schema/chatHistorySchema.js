import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:["user" , "assistant" ],
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    model:{
        type:String,
        enum:["gemini" , "gpt-3.5-turbo" , "gpt-4"],
        default:null
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const chatHistorySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        default:"New Chat"
    },
    messages:[messageSchema],
    isActive:{
        type:Boolean,
        default:true
    },
    lastActivity:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
});


chatHistorySchema.index({ userId: 1, lastActivity: -1 });

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

export default ChatHistory;