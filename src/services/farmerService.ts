import dbConnect from '@/lib/mongodb';
import Farmer, { IFarmer } from '@/lib/models/Farmer';

export const farmerService = {
  async getAllFarmers(): Promise<IFarmer[]> {
    await dbConnect();
    return Farmer.find({}).populate('assignedCrops').lean();
  },

  async createFarmer(data: Partial<IFarmer>): Promise<IFarmer> {
    await dbConnect();
    const farmer = await Farmer.create(data);
    return farmer.toObject();
  }
};