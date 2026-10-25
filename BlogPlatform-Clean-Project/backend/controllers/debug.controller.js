import mongoose from 'mongoose';

export const status = async (req, res) => {
  try {
    const readyState = mongoose.connection.readyState; // 0 disconnected, 1 connected

    return res.status(200).json({
      ok: true,
      env: {
        node_env: process.env.NODE_ENV || 'development',
        mongo_url_present: !!process.env.MONGO_URL,
        port: process.env.PORT || 3001,
      },
      db: {
        readyState,
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
