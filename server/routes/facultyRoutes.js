const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

router.get("/", async (req, res) => {
  try {
    console.log("📋 GET /api/faculty - Fetching all faculty members");
    const faculty = await Faculty.find();
    console.log(`✅ Found ${faculty.length} faculty members:`, faculty);
    res.json(faculty);
  } catch (error) {
    console.log("❌ Error fetching faculty:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("📝 POST /api/faculty - Received data:", req.body);
    const newFaculty = new Faculty(req.body);
    const savedFaculty = await newFaculty.save();
    console.log("✅ Faculty saved successfully:", savedFaculty);
    res.json(savedFaculty);
  } catch (error) {
    console.log("❌ Error saving faculty:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(`📝 PUT /api/faculty/${req.params.id} - Updating faculty:`, req.body);
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFaculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    console.log("✅ Faculty updated successfully:", updatedFaculty);
    res.json(updatedFaculty);
  } catch (error) {
    console.log("❌ Error updating faculty:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(`🗑️ DELETE /api/faculty/${req.params.id} - Deleting faculty`);
    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!deletedFaculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    console.log("✅ Faculty deleted successfully:", deletedFaculty);
    res.json({ message: "Faculty deleted successfully", faculty: deletedFaculty });
  } catch (error) {
    console.log("❌ Error deleting faculty:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
