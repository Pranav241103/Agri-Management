import mongoose from 'mongoose';

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
});

export default mongoose.models.Farmer || mongoose.model('Farmer', FarmerSchema);