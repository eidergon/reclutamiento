<?php
require_once 'conexion.php';
$busqueda = $_GET['busqueda'];

$sql = "SELECT * FROM formadores WHERE sede = '$busqueda'";
$result = $conn->query($sql);
?>

<?php if ($result->num_rows > 0) : ?>
    <?php while ($row = $result->fetch_assoc()) : ?>
        <option value="">Formador</option>
        <option value="<?= $row['nombre']; ?>"><?= $row['nombre']; ?></option>
    <?php endwhile; ?>
<?php else : ?>
<?php endif; ?>