const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

router.get("/", async (req, res) => {
  try {
    console.log("📋 GET /api/department - Fetching all departments");
    const departments = await Department.find();
    console.log(`✅ Found ${departments.length} departments:`, departments);
    res.json(departments);
  } catch (error) {
    console.log("❌ Error fetching departments:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("📝 POST /api/department - Received data:", req.body);
    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();
    console.log("✅ Department saved successfully:", savedDepartment);
    res.json(savedDepartment);
  } catch (error) {
    console.log("❌ Error saving department:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(`📝 PUT /api/department/${req.params.id} - Updating department:`, req.body);
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    console.log("✅ Department updated successfully:", updatedDepartment);
    res.json(updatedDepartment);
  } catch (error) {
    console.log("❌ Error updating department:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(`🗑️ DELETE /api/department/${req.params.id} - Deleting department`);
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    console.log("✅ Department deleted successfully:", deletedDepartment);
    res.json({ message: "Department deleted successfully", department: deletedDepartment });
  } catch (error) {
    console.log("❌ Error deleting department:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
