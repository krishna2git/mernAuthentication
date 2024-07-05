const mongoose = require("mongoose");

const DB = "mongodb+srv://krishna:2march2000*@cluster0.ezk1dwu.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(()=> console.log("Database Connected")).catch((errr)=>{
    console.log("errr");
})