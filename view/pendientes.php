<?php
require '../php/conexion.php';

session_start();
$nombre = $_SESSION["nombre"];

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: ../');
    exit();
}

$sql = "SELECT * FROM reclutas WHERE reclutador = '$nombre' and asistio is null order by id desc";
$result = $conn->query($sql);

?>

<?php if ($result->num_rows > 0) : ?>

    <?php if ($nombre == 'Agenda') : ?>
        <table class='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Medio</th>
                    <th>Ciudad</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Mensaje</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $result->fetch_assoc()) : ?>
                    <tr scope='row'>
                        <td data-form='editar_pendiente' data-id="<?= $row["id"] ?>" class="id"><?= $row["id"] ?></td>
                        <td><?= $row["nombre"] ?></td>
                        <td><?= $row["telefono"] ?></td>
                        <td><?= $row["modalidad"] ?></td>
                        <td><?= $row["ciudad"] ?></td>
                        <td><?= $row["fecha_cita"] ?></td>
                        <td><?= $row["hora"] ?></td>
                        <td><button data-modalidad="<?= $row["modalidad"] ?>" data-telefono="<?= $row["telefono"] ?>" data-hora="<?= $row["hora"] ?>" data-nombre="<?= $row["nombre"] ?>" data-ciudad="<?= $row["ciudad"] ?>" data-fecha="<?= $row["fecha_cita"] ?>" class="wpp"><i class="fa-brands fa-whatsapp"></i></button></td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    <?php else : ?>
        <table class='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Documento</th>
                    <th>Medio</th>
                    <th>Ciudad</th>
                    <th>Reclutador</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $result->fetch_assoc()) : ?>
                    <tr scope='row'>
                        <td data-form='editar_pendiente' data-id="<?= $row["id"] ?>" class="id"><?= $row["id"] ?></td>
                        <td><?= $row["nombre"] ?></td>
                        <td><?= $row["telefono"] ?></td>
                        <td><?= $row["documento"] ?></td>
                        <td><?= $row["medio"] ?></td>
                        <td><?= $row["ciudad"] ?></td>
                        <td><?= $row["reclutador"] ?></td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    <?php endif; ?>
<?php else : ?>
    <table class='table' id="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Documento</th>
                <th>Medio</th>
                <th>Ciudad</th>
                <th>Reclutador</th>
            </tr>
        </thead>
        <tbody>
            <tr scope='row'>
                <td colspan='8' class='no-data'>Sin Datos</td>
            </tr>
        </tbody>
    </table>
<?php endif; ?>
<script src="../js/script.js"></script>