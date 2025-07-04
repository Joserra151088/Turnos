const empleados = [
  { nombre: "Erick Morales Berber",    puesto: "Médico",   telefono: "5513049755", inicio: "09:00", fin: "18:00" },
  { nombre: "Liliana Martínez Olvera",   puesto: "Cordinador de la Atención",   telefono: "5579210195", inicio: "09:00", fin: "18:00" },
  { nombre: "Arely Fernanda Pliego Martínez",  puesto: "Cordinador de la Atención",   telefono: "5512383574", inicio: "09:00", fin: "18:00" },
  { nombre: "José Alberto Ceja González",    puesto: "Cordinador de la Atención", telefono: "5541778453", inicio: "09:00", fin: "18:00" },
  { nombre: "Alfonso Domínguez Cuapantecatl",    puesto: "Médico", telefono: "5580093861", inicio: "06:00", fin: "18:00" },
  { nombre: "Liza Michelle Magdaleno Fourlong",    puesto: "Médico", telefono: "5580093861", inicio: "09:00", fin: "18:00" },
  { nombre: "Sergio Peña Sánchez",    puesto: "Médico", telefono: "5580093861", inicio: "18:00", fin: "06:00" },
  { nombre: "Fernando José Pico Querales",    puesto: "Médico", telefono: "5543461450", inicio: "09:00", fin: "18:00" },
  { nombre: "Brenda Liliana Hernández Aguirre",    puesto: "Médico", telefono: "5530717483", inicio: "09:00", fin: "18:00" },
  { nombre: "Alejandra Noguez García",    puesto: "Médico", telefono: "5543481064", inicio: "09:00", fin: "18:00" },
  { nombre: "Atenas Olimpia Arroyo Fernández",    puesto: "Cordinador de la Atención", telefono: "5512371205", inicio: "09:00", fin: "18:00" },
  { nombre: "Jazmin Rebollo Vargas",    puesto: "Cordinador de la Atención", telefono: "5512371205", inicio: "09:00", fin: "18:00" },
  { nombre: "Yunery Marlen Bautista Gómez",    puesto: "Psícoloca", telefono: "5641751981", inicio: "09:00", fin: "18:00" },
  { nombre: "Leidy Guadalupe Díaz Ruiz",    puesto: "Cordinador de la Atención", telefono: "5512366446", inicio: "09:00", fin: "18:00" },
  { nombre: "Hugo Vilchis Rojas",    puesto: "Afiliaciones", telefono: "5544882744", inicio: "09:00", fin: "18:00" },
  { nombre: "Frida Romo Chávez",    puesto: "Cordinador de la Atención", telefono: "5540852893", inicio: "09:00", fin: "18:00" },
  { nombre: "Erika Elizabeth García Zamora",    puesto: "Cordinador de la Atención", telefono: "5539798496", inicio: "09:00", fin: "18:00" },
  { nombre: "Yaneli Marisol Morán Texta",    puesto: "Cordinador de la Atención", telefono: "5625602387", inicio: "09:00", fin: "18:00" },
  { nombre: "Monica Dominguez Andres",    puesto: "Cordinador de la Atención", telefono: "5574744776", inicio: "09:00", fin: "18:00" },
  { nombre: "Turno Noche", puesto: "Guardia Nocturna", telefono: "55-9988-7766", inicio: "18:00", fin: "06:00" },
];

function mostrarHora() {
  const ahora = new Date();
  const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  document.getElementById("clock").textContent = ahora.toLocaleTimeString('es-ES', opciones);
}

function actualizarTabla() {
  const ahora = new Date();
  const actualMinutos = ahora.getHours() * 60 + ahora.getMinutes();
  const cuerpo = document.getElementById("tabla-turnos");
  cuerpo.innerHTML = "";

  empleados.forEach(emp => {
    const [hInicio, mInicio] = emp.inicio.split(":").map(Number);
    const [hFin,    mFin]    = emp.fin.split(":").map(Number);
    const inicioMinutos = hInicio * 60 + mInicio;
    const finMinutos    = hFin   * 60 + mFin;

    let enTurno = false;
    if (inicioMinutos <= finMinutos) {
      enTurno = actualMinutos >= inicioMinutos && actualMinutos <= finMinutos;
    } else {
      enTurno = actualMinutos >= inicioMinutos || actualMinutos <= finMinutos;
    }

    let estado = "", clase = "";
    if (enTurno) {
      estado = "🟢 En turno"; clase = "en-turno";
    } else if (
      (inicioMinutos <= finMinutos && actualMinutos < inicioMinutos) ||
      (inicioMinutos > finMinutos && actualMinutos < inicioMinutos && actualMinutos > finMinutos)
    ) {
      estado = "🕒 Por entrar"; clase = "por-entrar";
    } else {
      estado = "🔴 Fuera de turno"; clase = "fuera-turno";
    }

    cuerpo.innerHTML += `
      <tr>
        <td>${emp.nombre}</td>
        <td>${emp.puesto}</td>
        <td>${emp.telefono}</td>
        <td>${emp.inicio} - ${emp.fin}</td>
        <td class="estado ${clase}">${estado}</td>
      </tr>`;
  });
}

setInterval(() => {
  mostrarHora();
  actualizarTabla();
}, 1000);

// Primera ejecución
mostrarHora();
actualizarTabla();
