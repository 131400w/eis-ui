export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '192.168.20.141'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'eisdb'),
      user: env('DATABASE_USERNAME', 'hzypc'),
      password: env('DATABASE_PASSWORD', 'hzypc123'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
  myframeConnection:{
    connectionLimit:20,
    host:env('DATABASE_HOST', '192.168.20.141'),
    port:env.int('DATABASE_PORT', 3306),
    user:env('DATABASE_USERNAME', 'hzypc'),
    password:env('DATABASE_PASSWORD', 'hzypc123'),
    ssl: env.bool('DATABASE_SSL', false),
    database:env('DATABASE_NAME', 'eisdb')
}
});
