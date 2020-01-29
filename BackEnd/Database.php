<?php

class Database
{
    private static $dbName = 'talkit' ;
    private static $dbHost = 'talkit.postgres.database.azure.com' ;
    private static $dbUsername = 'talkitadmin@talkit';
    private static $dbUserPassword = 'Sofarawaya7x.';

    private static $cont  = null;

    public static function connect()
    {
        if ( null == self::$cont )
        {
            try
            {
                self::$cont =  pg_connect( "host=".self::$dbHost." "."dbname=".self::$dbName." "."user=".self::$dbUsername." "."password=".self::$dbUserPassword);
//                echo "Connection complete";
            }
            catch(PDOException $e)
            {
                die($e->getMessage());
            }
        }
        return self::$cont;
    }

    public static function disconnect()
    {
        pg_close(self::$cont);
    }
}