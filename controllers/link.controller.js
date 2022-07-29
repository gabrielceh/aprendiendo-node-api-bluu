import { Link } from '../models/LinksModel.js';
import { nanoid } from 'nanoid';

export const getLinks = async (req, res) => {
  try {
    // find nos lista todos los elementos
    // req.uid vienen del req.uid creado en el requireToken
    const links = await Link.find({ uid: req.uid });

    return res.json({ links });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'error de servidor' });
  }
};

export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    // find nos lista todos los elementos
    // req.uid vienen del req.uid creado en el requireToken
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ error: 'No existe el link' });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: 'Permiso invalidado 🤡' });
    }

    return res.json({ link });
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Formato de id no valido' });
    }
    return res.status(500).json({ error: 'error de servidor' });
  }
};

export const createLink = async (req, res) => {
  try {
    const { original_link } = req.body;
    console.log(original_link);
    const link = new Link({
      original_link,
      nano_link: nanoid(10),
      uid: req.uid,
      // req.uid vienen del req.uid creado en el requireToken
    });
    const newLink = await link.save();
    return res.status(201).json({ newLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'error de servidor' });
  }
};

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    // find nos lista todos los elementos
    // req.uid vienen del req.uid creado en el requireToken
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ error: 'No existe el link' });
    }

    if (!link.uid.equals(req.uid)) {
      return res.status(401).json({ error: 'Permiso invalidado 🤡' });
    }

    link.remove();

    return res.json({ link, message: 'Link eliminado' });
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Formato de id no valido' });
    }
    return res.status(500).json({ error: 'error de servidor' });
  }
};
