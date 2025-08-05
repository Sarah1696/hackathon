import db_sql from '../../database.js'
import argon2 from "argon2"
class UserModel{

async findUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db_sql.execute(sql, [email]);
    return rows[0] || null;
  }

async createUser(lastname, firstname, email, password) {
  try { 
    const hashedPassword = await argon2.hash(password)
    const sql = `
      INSERT INTO users (lastname, firstname, email, password)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db_sql.execute(sql, [lastname, firstname, email, hashedPassword]);

    console.log('Utilisateur créé avec ID :', result.insertId);    

    return { success: true, userId: result.insertId };

  } catch (error) {
    console.error('Erreur :', error.message);
    return { success: false, error: error.message };
  }
}

async loginUser(email, password) {
    try {
      const user = await this.findUserByEmail(email);

      if (!user) {
        return { success: false, message: 'Email incorrect ou utilisateur non trouvé.' };
      }

const isValid = await argon2.verify(user.password, password)

     
      if (!isValid) {
        return { success: false, message: 'Email ou mot de passe incorrect.' };
      }

       

      return {
        success: true,
        user: {
          id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          email: user.email
          
        }
      };

    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
      return { success: false, message: 'Erreur serveur.' };
    }
  }







}
export default new UserModel()