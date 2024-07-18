const auth = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

export default auth;
