require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const ApplymentType = require("./models/ApplymentType");
const ApplymentForm = require("./models/ApplymentForm");

const { authenticateToken, authorizeRole } = require('./middleware/authMiddleware');
const cors = require('cors');


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'], 
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB bağlıdır"))
  .catch((error) => console.error("MongoDB bağlantı xətası:", error));

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "İstifadəçi tapılmadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Parol yanlışdır" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email, name: user.name, surname: user.surname}, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
});

app.post("/api/admin/create-superadmin", authenticateToken, authorizeRole('superadmin'), async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    const existingSuperAdmin = await User.findOne({ email: email, role: "superadmin" });
    if (existingSuperAdmin) {
      return res.status(400).json({ message: "Bu email ilə super admin artıq mövcuddur" });
    }

    const lastSuperAdmin = await User.findOne({ role: "superadmin" }).sort({ id: -1 });
    const newId = lastSuperAdmin ? lastSuperAdmin.id + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10);

    const superAdmin = new User({
      id: newId,
      name,
      surname,
      email,
      password: hashedPassword,
      role: "superadmin",
    });

    await superAdmin.save();
    res.status(201).json({ message: "Super admin uğurla yaradıldı" });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
});

app.post('/api/admin/create-admin', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
          return res.status(400).json({ message: 'Bu email ilə admin artıq mövcuddur' });
      }

      const lastAdmin = await User.findOne().sort({ id: -1 }).exec();
      const newId = lastAdmin ? lastAdmin.id + 1 : 1;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({ id: newId, name, surname, email, password: hashedPassword, role: 'admin' });

      await newAdmin.save();
      res.status(201).json({ message: 'Admin əlavə edildi' });
  } catch (error) {
      res.status(500).json({ message: "Xəta baş verdi", error });
  }
});



app.get("/api/admins", authenticateToken, authorizeRole('superadmin'), async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["admin", "superadmin"] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
});



app.put('/api/admins/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findOneAndUpdate({ id: parseInt(id) }, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    res.json({ message: "Rolu yeniləndi", user });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
});


app.get("/api/users", authenticateToken, authorizeRole('superadmin'), async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["admin", "superadmin"] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
});


app.get('/api/admins/:id', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
});


app.put('/api/admins/:id', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, role, password } = req.body;

  try {
    let updateData = { name, surname, email, role };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const user = await User.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    res.json({ message: "Məlumatlar yeniləndi", user });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
});

app.delete('/api/admins/:id', authenticateToken, authorizeRole('superadmin'), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ id: parseInt(id) });

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    res.json({ message: "İstifadəçi uğurla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
});


app.get('/api/applyment-types', async (req, res) => {
  try {
    const types = [
      { id: 1, name: 'Imtahan' },
    ];
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: 'Xəta baş verdi', error });
  }
});

app.get('/api/applyment-forms', async (req, res) => {
  try {
    const forms = [
      { id: 1, name: '25%', description: 'İmtahan üçün 25%' }
    ];
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Xəta baş verdi', error });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda işləyir`));
