 const isClient = (req, res, next) => {
  if (req.user.role !== "client")
    return res.status(403).json({ message: "Forbidden" });
  next();
};

export default isClient