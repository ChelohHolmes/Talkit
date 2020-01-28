<?php


class UserProminent
{
    public static function check($id, $dataB)
    {
        $query = "SELECT count(id_usuario) from public.destaque WHERE id_usuario = ". $id;
        $res = pg_query($dataB, $query);
        if (pg_fetch_result($res, 0, 0) < 1) {
            $query = "INSERT into public.destaque (id_usuario, moderacion, votos_conteo, destacado, expulsiones, baneos, desbaneo) VALUES ('". $id ."', default, default, default, default, default, default)";
            pg_query($dataB, $query);
        }
    }
    public static function giveStatus($id, $dataB)
    {
        $query = "UPDATE public.destaque SET destacado = 't' WHERE id_usuario = " . $id;
        $res = pg_query($dataB, $query);
//        $query = "SELECT correo from public.usuario WHERE id_usuario = ". $id;
//        $res = pg_query($dataB, $query);
//        $mail = pg_fetch_result($res, 0,0);
//        $sbj = 'Talkit usuario cool';
//        $link = 'https://docs.google.com/spreadsheets/d/1N-Uyy-wOQozE_1W2B5t14CqqZzLNeTjb86OwK29-iIE/edit?usp=sharing';
//        $msg = 'You are now a destacado user, you can help us translate Talkit to other languages on this link: '. $link;
//        $headers = 'From: support@talkit.com';
//        mail($mail, $sbj, $msg, $headers);
    }
}