const customDesign = require("../schemas/customDesign.schema");
const { default: mongoose } = require("mongoose");

let customDesignController = {};

customDesignController.createDesign = async (req, res) => {
  try {
    const body = req.body;
    if (req.files) {
      body.images = req?.files?.map(file => file.path);
  }
    const createDesign = await customDesign.create(body);
    if (!createDesign) {
      return res.status(400).json({ message: "Error in creating design" });
    }

    res.status(201).json({ message: "Design created successfully", design: createDesign });
  } catch (error) {
    console.error("Error creating design:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

customDesignController.getDesignBySupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const getAllDesigns = await customDesign.find({ supplierId: new mongoose.Types.ObjectId(id)});
    if (!getAllDesigns.length) {
      return res.status(404).json({ message: "No designs found" });
    }

    res.status(200).json({ message: "Designs fetched successfully", data: getAllDesigns });
  } catch (error) {
    console.error("Error fetching designs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = customDesignController;
