const { default: mongoose } = require("mongoose");
const usersSchema = require("../schemas/users.schema");

const userController = {};

userController.getAllUsers = async (req, res) => {
  try {
    const users = await usersSchema.find({ role: "User" });
    return res.status(200).send({
      status: 200,
      message: "Users Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};


userController.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await usersSchema.find({ role: "Seller" });
    return res.status(200).send({
      status: 200,
      message: "Suppliers Retrieved Successfully",
      data: suppliers,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

userController.rejectSupplier = async(req, res) => {
  try{
    const id = req.params.id;
    const updateUser = await usersSchema.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isAccountActive: false } },
      { new: true } 
    );
    if (!updateUser) {
      return res.status(400).json({ message: "Error in rejecting supplier" });
    }
    res.status(200).json({ message: "Supplier rejected successfully", user: updateUser });
  }catch(error){
    console.error("Something went wrong:", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

userController.approveSupplier = async(req, res) => {
  try{
    const id = req.params.id;
    const updateUser = await usersSchema.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isAccountActive: true } },
      { new: true } 
    );
    if (!updateUser) {
      return res.status(400).json({ message: "Error in verifying supplier" });
    }
    res.status(200).json({ message: "Supplier verified successfully", user: updateUser });
  }catch(error){
    console.error("Something went wrong:", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const updateUser = await usersSchema.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: body },
      { new: true } 
    );
    if (!updateUser) {
      return res.status(400).json({ message: "Error in updating user" });
    }
    res.status(200).json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

userController.getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await usersSchema.findById({ _id: new mongoose.Types.ObjectId(id) });
    return res.status(200).send({
      status: 200,
      message: "Users Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
}

userController.updatePassword = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await usersSchema.findOne({ _id: new mongoose.Types.ObjectId(id) });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(403)
        .json({ status: 403, message: "Incorrect old password" });
    }

    if (user !== null) {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      await employeeSchema.updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: hashedPassword } }
      );

      return res.status(200).json({
        status: 200,
        message: "Password Updated Successfully.",
        user: user,
      });
    } else {
      return res.status(404).json({ status: 404, message: "User Not Found" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

userController.uploadImage = async(req, res) => {
  try{
    console.log("hello");
    const pictureFile = req.file?.path;
    console.log(pictureFile);
    if (!pictureFile) {
      return res
        .status(400)
        .json({ status: 400, message: "Picture is required." });
    }
    const id = req.params.id;
    const saveImage = await usersSchema.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          imagePath: pictureFile,
        },
      }
    );
    if (saveImage) {
      return res.status(200).json({
        status: 200,
        message: "image uploaded successfully",
        data: saveImage,
      });
    }

  }catch(error){
    console.error("Something went wrong:", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
}

module.exports = userController;
