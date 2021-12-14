module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    database: 'nestjs',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};