
const net = require('net');
const HOST = 'server'; 
const PORT = 5555;

function sendCommand(cmd) {
  return new Promise((resolve, reject) => {
    const sock = net.createConnection({ host: HOST, port: PORT }, () => {
      sock.write(cmd.endsWith('\n') ? cmd : cmd + '\n');
      sock.end();         
    });

    sock.once('data', chunk => {
      resolve(chunk.toString().trim());
      sock.destroy();       
    });

    sock.once('error', err => {
      sock.destroy();
      reject(err);
    });
  });
}

exports.add = (req, res) => {
  const link = req.body.link;
  if (!link) return res.status(400).json({ error: 'link is required' });

  sendCommand(`POST ${link}`)
    .then(() => res.status(201).json({ message: 'added to blacklist' }))
    .catch(err => {
      console.error(err);
      res.status(502).json({ error: 'exercise-2 server unreachable' });
    });
};

exports.remove = (req, res) => {
  //const fullPath = req.originalUrl; 
  //const prefix = '/api/blacklist/';
  //const link = decodeURIComponent(fullPath.slice(prefix.length));
  //console.log('Trying to delete:', link);
  const link = req.params.id; 
  if (!link) return res.status(400).json({ error: 'link is required' });

  sendCommand(`DELETE ${link}`)
    .then(() => res.json({ message: 'deleted from blacklist' }))
    .catch(err => {
      console.error(err);
      res.status(502).json({ error: 'exercise-2 server unreachable' });
    });
};
