<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Reclutamiento</title>
    <link rel="shortcut icon" href="img/logo-removebg-preview.png" type="image/x-icon">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <div class="wrapper">
        <form method="post">
            <h1>login</h1>
            <div class="input-box">
                <input type="text" name="username" placeholder="Username" autocomplete="off" required>
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder="Password" autocomplete="off" required>
                <i class="fa-solid fa-lock"></i>
            </div>
            <button type="submit" class="btn">Login</button>
        </form>
    </div>

    <?php
    require_once 'php/conexion.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = $_POST["password"];

        $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $resultado = $conn->query($query);

        if ($resultado->num_rows > 0) {
            $row = $resultado->fetch_assoc();
            session_start();
            $_SESSION["nombre"] = $row["nombre"];
            $_SESSION["cargo"] = $row["cargo"];
            $_SESSION['logged_in'] = true;
            header("Location: view/inicio.php");
            exit;
        } else {
            // La autenticación falló, muestra un mensaje de error
            echo '<script>
                        Swal.fire({
                            icon: "error",
                            title: "Error de autenticación",
                            text: "Usuario o contraseña incorrectos",
                        });
                    </script>';
        }

        // Cierra la conexión a la base de datos
        $conn->close();
    }
    ?>
</body>

</html>