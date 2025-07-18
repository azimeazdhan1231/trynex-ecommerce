const { exec } = require('child_process');
const port = process.env.PORT || 5000;

console.log(`Starting TryneX E-commerce Platform on port ${port}`);

// Use http-server with proper port configuration
exec(`npx http-server -p ${port} -c-1 --cors`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});