$(document).ready(function () {
    $(".php").on("click", function (e) {
        e.preventDefault();

        var formName = $(this).data("form");

        $.ajax({
            url: formName + ".php",
            type: "GET",
            success: function (response) {
                $("#main").html(response);
            },
            error: function (error) {
                console.log("Error al cargar el formulario:", error);
            },
        });
    });
    // -------------------------------------------------------------------------- //

    // crear candidato
    $("#crear_candidato").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: "../php/subir_candidato.php",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message,
                    });
                    $("#crear_candidato")[0].reset();
                } else if (response.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.message,
                    });
                    $("#crear_candidato")[0].reset();
                }
            },
        });
    });

    $("#tipificacion").change(function () {
        var selectedValue = $(this).val();
        var dateField = $("#fechaCampo");
        var ampm = $("#ampm");

        if (selectedValue === "CITADO") {
            dateField.removeClass("hidden");
            ampm.removeClass("hidden");
            dateField.prop("required", true);
            ampm.prop("required", true);
        } else {
            dateField.addClass("hidden");
            ampm.addClass("hidden");
            dateField.prop("required", false);
            ampm.prop("required", false);
        }
    });

    // Obtener la fecha actual en el formato YYYY-MM-DD
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    // -------------------------------------------------------------------------- //

    // busqueda en tiendo real
    $('input[name="busqueda"]').on("keyup", function () {
        var busqueda = $(this).val();

        $.ajax({
            url: "../php/consulta_candidato.php",
            type: "GET",
            data: { busqueda: busqueda },
            success: function (response) {
                $("#resultadoBusqueda").html(response);
            },
        });
    });
    // -------------------------------------------------------------------------- //

    // editar asistencia
    $("#btn-editar").click(function () {
        $("#btn-editar").toggleClass("hidden");
        $("#btn-cancelar, #btn-guardar, #btn-reagendar").removeClass("hidden");
        $("#radio1, #radio2").prop("disabled", false);
    });

    $("#btn-cancelar").click(function () {
        $("#btn-editar").removeClass("hidden");
        $("#btn-cancelar, #btn-guardar, #btn-reagendar").toggleClass("hidden");
        $("#radio1, #radio2").prop("disabled", true).prop("checked", false);
        $("#fechaCampo").prop("readonly", true);
        $("#label").addClass("hidden").prop("required", false);
        $("#motivos").val("");
    });

    $("#btn-reagendar").click(function () {
        $("#fechaCampo").prop("readonly", false);
        $("#radio1, #radio2").prop("disabled", true).prop("checked", false);
        $("#fechaCampo").attr("min", today);
    });

    $("#radio2").change(function () {
        if (this.checked) {
            $("#label").removeClass("hidden").prop("required", true);
        } else {
            $("#label").addClass("hidden").prop("required", false);
        }
    });

    $("#radio1").change(function () {
        if (this.checked) {
            $("#label").addClass("hidden").prop("required", false);
        } else {
            $("#label").removeClass("hidden").prop("required", true);
        }
    });

    $("#editar_asistencia").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        console.log("sdhagdh");
        $.ajax({
            url: "../php/subir_asistencia.php",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message,
                    });
                } else if (response.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.message,
                    });
                }
            },
        });
    });

    $(".id").on("click", function (e) {
        e.preventDefault();

        var formName = $(this).data("form");
        var idValue = $(this).data("id");

        var formUrl = "../view/" + formName + ".php?id=" + encodeURIComponent(idValue);

        $.ajax({
            url: formUrl,
            type: "GET",
            success: function (response) {
                $("#main").html(response);
            },
            error: function (error) {
                console.log("Error al cargar el formulario:", error);
            },
        });
    });
    // -------------------------------------------------------------------------- //

    // crear formacion
    $("#ciudad").change(function () {
        var busqueda = $(this).val();

        $.ajax({
            url: "../php/consulta_formadores.php",
            type: "GET",
            data: { busqueda: busqueda },
            success: function (response) {
                $("#formador").html(response);
            },
        });

        var ciudadSeleccionada = $(this).val();
        var campañaSelect = $("#campaña");

        campañaSelect.empty().append("<option value=''>Campaña</option>");

        if (ciudadSeleccionada === "Bogota") {
            agregarOpcion(campañaSelect, "TYT");
            agregarOpcion(campañaSelect, "Dedicadas");
            agregarOpcion(campañaSelect, "Portabilidad");
        } else if (ciudadSeleccionada === "Medellin") {
            agregarOpcion(campañaSelect, "Portabilidad");
            agregarOpcion(campañaSelect, "Migracion");
            agregarOpcion(campañaSelect, "Hogar");
        } else if (ciudadSeleccionada === "Uraba") {
            agregarOpcion(campañaSelect, "Hogar");
            agregarOpcion(campañaSelect, "Portabilidad");
        }
    });

    function agregarOpcion(select, valor) {
        var opcion = $("<option></option>").attr("value", valor).text(valor);
        select.append(opcion);
    }

    $("#fechaInicio").attr("min", today);

    $("#crear_formacion").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: "../php/subir_formacion.php",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message,
                    });
                    $("#crear_formacion")[0].reset();
                } else if (response.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.message,
                    });
                    $("#crear_formacion")[0].reset();
                }
            },
        });
    });
    // -------------------------------------------------------------------------- //

    // formulario
    $('#radio17').change(function () {
        var inputText = $(this).next('.radio-button__label').find('.select');
        if ($(this).is(':checked')) {
            inputText.prop('disabled', false);
        } else {
            inputText.prop('disabled', true);
        }
    });

    // Actualiza el valor del radio button cuando el campo de texto cambia
    $('.eps').on('input', function () {
        if ($('#radio17').is(':checked')) {
            $('#radio17').val($(this).val());
        }
    });

    $('#radio26').change(function () {
        var inputText = $(this).next('.radio-button__label').find('.select');
        if ($(this).is(':checked')) {
            inputText.prop('disabled', false);
        } else {
            inputText.prop('disabled', true);
        }
    });

    // Actualiza el valor del radio button cuando el campo de texto cambia
    $('.nacionalidad').on('input', function () {
        if ($('#radio26').is(':checked')) {
            $('#radio26').val($(this).val());
        }
    });

    // guardar formulario
    $("#sociodemografico").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: "../php/sociodemografico.php",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message,
                    });
                    $("#sociodemografico")[0].reset();
                } else if (response.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.message,
                    });
                    $("#sociodemografico")[0].reset();
                }
            },
        });
    });
    // -------------------------------------------------------------------------- //

    // cargue 
    $("#carga").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: "../php/cargar_candidatos.php",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message,
                        footer: "Total Records: " + response.total_records,
                    });
                    $("#archivo_excel").val("");
                } else if (response.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.message,
                        footer: "Total Records: " + response.total_records,
                    });
                    $("#archivo_excel").val("");
                }
            },
            error: function (error) {
                console.error("Error in AJAX request: ", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred during the request.",
                })
                $("#archivo_excel").val("");
            },
        });
    });
    // -------------------------------------------------------------------------- //

    // editar pendiente 
    $("#editar_pendiente").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: "../php/subir_pendiente.php",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message,
                    });
                } else if (response.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.message,
                    });
                }
            },
        });
    });

    // Obtén el botón de copiar
    var copiarButton = $("#copiarButton");

    // Función para copiar la URL al portapapeles
    function copiarURL() {
        // Obtén la URL generada
        var id = $("#id_recluta").val();
        var url = "http://10.206.173.188/reclutamiento/view/formulario.php?id=" + id;

        // Crea un elemento de texto temporal para copiar la URL al portapapeles
        var tempInput = $("<input>");
        $("body").append(tempInput);
        tempInput.val(url).select();
        document.execCommand("copy");
        tempInput.remove();

        // Informa al usuario que la URL se ha copiado
        Swal.fire({
            icon: "success",
            title: "Copiado",
            text: "URL copiada al portapapeles: " + url,
        });
    }

    // Agrega un listener al botón de copiar para llamar a la función copiarURL cuando sea clickeado
    copiarButton.click(copiarURL);

    $("#llenar").on("click", function (e) {
        e.preventDefault();
        var id = $("#id_recluta").val();
        var url = "formulario.php?id=" + id;

        $.ajax({
            url: url,
            type: "GET",
            success: function (response) {
                $("#main").html(response);
            },
            error: function (error) {
                console.log("Error al cargar el formulario:", error);
            },
        });
    });

    $(document).on('click', '.wpp', function (e) {
        e.preventDefault();

        var telefonoValue = $(this).data('telefono');
        var horaValue = $(this).data('hora');
        var nombreValue = $(this).data('nombre');
        var ciudadValue = $(this).data('ciudad');
        var fechaValue = $(this).data('fecha');
        var modalidadValue = $(this).data('modalidad');

        if (ciudadValue == 'Medellín') {
            var ubi = 'Cra. 52 #14-30 local 121';
        } else if (ciudadValue == 'Bogotá') {
            var ubi = 'Cra. 7 #17-51';
        } else if (ciudadValue == 'Urabá') {
            var ubi = 'Cra. 7 #17-51';
        }

        if (modalidadValue == 'Presencial') {
            var mensaje = encodeURIComponent("¡Hola! " + nombreValue + " recuerda tu entrevista " + modalidadValue + " el día " + fechaValue + " a las " + horaValue + " en la ciudad de " + ciudadValue + " ubicación: " + ubi);
        } else {
            var mensaje = encodeURIComponent("¡Hola! " + nombreValue + " recuerda tu entrevista " + modalidadValue + " el día " + fechaValue + " a las " + horaValue);
        }

        var enlaceWhatsApp = "https://wa.me/57" + telefonoValue + "/?text=" + mensaje;
        window.open(enlaceWhatsApp, '_blank');
    });
});
;