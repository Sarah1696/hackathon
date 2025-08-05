import UserModel from './model.js'


class UserController{

async createUser(req, res) {
  try {
    const { lastname, firstname, email, password } = req.body;

    if (!lastname || !firstname || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

   
    const result = await UserModel.createUser(lastname, firstname, email, password);

    if (result.success) {
      return res.status(201).json({ message: 'Utilisateur créé', userId: result.userId });
    } else {
      return res.status(400).json({ error: result.error });
    }

  } catch (error) {
    console.error('Erreur dans createUserController :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

async  login(req, res) {
  const { email, password } = req.body;

 
  const user = await UsersService.loginUser(email, password); 
  console.log(user)
const JWT_SECRET = "monsecretjwt123"
 
  const token = jwt.sign(
    { id: user._id, email: user.email }, 
    JWT_SECRET,
    { expiresIn: '1h' }
  );

 
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    
    maxAge: 3600000 
  });

  res.status(200).json({ message: 'Connexion réussie' });
}





}

export default new UserController()