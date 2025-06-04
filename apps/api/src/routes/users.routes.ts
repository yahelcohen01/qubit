import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get user with ID: ${id}` });
});

// Create new user
router.post('/', (req, res) => {
  const userData = req.body;
  res.status(201).json({ message: 'User created', data: userData });
});

// Update user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  res.json({ message: `Update user with ID: ${id}`, data: userData });
});

// Delete user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Delete user with ID: ${id}` });
});

export const usersRouter: Router = router;
