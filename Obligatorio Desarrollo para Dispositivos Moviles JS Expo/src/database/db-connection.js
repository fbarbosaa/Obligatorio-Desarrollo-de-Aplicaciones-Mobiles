import * as SQLite from 'expo-sqlite';
const DBNAME = 'database.db';

const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase(DBNAME),
    closeConnection: () => SQLite.closeDatabase(DBNAME),
    inserUser: (userName,cedula, apellido) => {
        const db = getConnection();
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO persona (userName,cedula, apellido, ) VALUES (?, ?, ?)',
                [userName,cedula, apellido ],
                (tx, results) => {
                    if(results.rowsAffected > 0){
                        return results.rowsAffected;
                    }
                    return 0;
                }
            )
        });
    }        
}

export default DatabaseConnection;