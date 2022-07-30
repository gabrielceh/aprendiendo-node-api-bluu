import { Link } from '../models/LinksModel.js';

export const redirectLink = async (req, res) => {
  try {
    const { nano_link } = req.params;
    // find nos lista todos los elementos
    // req.uid vienen del req.uid creado en el requireToken
    const link = await Link.findOne({ nano_link });
    if (!link) {
      return res.status(404).json({ error: 'No existe el link' });
    }
    return res.redirect(link.original_link);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Formato de id no valido' });
    }
    return res.status(500).json({ error: 'error de servidor' });
  }
};
