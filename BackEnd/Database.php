<?php

class Database
{
    private static $dbName = 'Talkit' ;
    private static $dbHost = 'localhost' ;
    private static $dbUsername = 'postgres';
    private static $dbUserPassword = 'postgres';

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