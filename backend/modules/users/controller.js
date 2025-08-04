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

async loginUser(req, res) {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    
    const result = await UserModel.loginUser(email, password);

    if (!result.success) {
      return res.status(401).json({ error: result.message });
    }

    
    return res.status(200).json({
      message: 'Connexion réussie',
      user: result.user
    });

  } catch (error) {
    console.error(' Erreur dans loginUserController :', error.message);
    return res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
}






}

export default UserController