import pool from "../postgreDb.js"
const registerNewUser = async(req,res,next)=>{
    const { title,fullName } = req.body;
    console.log(title,fullName)
  try {
    const result = await pool.query(
      'INSERT INTO newusers (title,fullname) VALUES ($1, $2) RETURNING *',
      [title,fullName]
    );
    res.json(result.rows[0]);
    console.log('Added')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export default registerNewUser