import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const viewSchema = new mongoose.Schema({
  count: { type: Number, default: 0 }
});

let conn = null;

export default async function handler(req, res) {
  if (!conn) {
    conn = await mongoose.connect(MONGODB_URI);
  }

  const View = mongoose.models.View || mongoose.model('View', viewSchema);

  if (req.method === 'POST') {
    let viewData = await View.findOne();
    if (!viewData) viewData = await View.create({ count: 1 });
    else {
      viewData.count += 1;
      await viewData.save();
    }
    return res.status(200).json({ count: viewData.count });
  } 
  
  const viewData = await View.findOne();
  return res.status(200).json({ count: viewData ? viewData.count : 0 });
}