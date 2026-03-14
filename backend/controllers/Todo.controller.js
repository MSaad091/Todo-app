import Todo from "../model/Todo.model.js";

const CreateTodo = async (req, res) => {
  try {
    const { title, text } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is Required"
      });
    }

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is Required"
      });
    }

    const createtodo = await Todo.create({
      title,
      text
    });

    return res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      createtodo
    });

  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
const updateTodo = async (req,res) => {

    try {
        const {id} = req.params;
            const { title, text } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is Required"
      });
    }

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is Required"
      });
    }
        const todo = await  Todo.findByIdAndUpdate(
        id,
        {title,text},
        {new:true}
        )
        if (!todo) {
            return res.status(404).json({
                success:false,
                message:"Todo Not Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:" Updated SuccessFully"
        })
    } catch (error) {
       
        return res.status(500).json({
            success:false, 
            message:"Server Error"
        })
        
    }
}
const deletetodo = async (req,res) => {
    try {
        const {id} = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                success:false,
                message:"Todo Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Deleted SuccessFull"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}
// const AllTodo = async (req,res) => {
//     try {
//         const todo = await Todo.find();
//         if (!todo) {
//             return res.status(404).json({
//                 success:false,
//                 message:"Todo Not Found"
//             })
//         }

//         return res.status(200).json({
//             success:true,
//             message:"Your All Todos Here",
//             todo
//         })
//     } catch (error) {
//         console.log(error);
        
//     }
// }
const AllTodo = async (req,res) => {
    try {

        const todo = await Todo.find({ user: req.user._id });

        return res.status(200).json({
            success:true,
            message:"Your All Todos Here",
            todo
        })

    } catch (error) {
        console.log(error);
    }
}
const getSingleTodo = async (req,res) => {
  try {
    const {id} = req.params;

    const todo = await Todo.findById(id)
    if (!todo) {
      return res.status(404).json({
        success:false,
        message:"Todo Not Found"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Single Todo Fetched",
      todo
    })
  } catch (error) {
    console.log(error);
    
  }
}
export {getSingleTodo,CreateTodo,updateTodo,deletetodo,AllTodo}