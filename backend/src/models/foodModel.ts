import mongoose, { Schema } from 'mongoose';

const foodSchema: Schema = new mongoose.Schema(
  {
    _id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    details: {
      type: mongoose.Schema.Types.Map,
      of: {
        unit: { type: 'string' },
        amount: { type: 'number' },
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Food = mongoose.model('Food', foodSchema);
