import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorporateDataService {
  
  public getDatabase(): Record<string, any> {
    return {
      'grupo': {
        title: 'El Grupo Impactex',
        subtitle: 'La evolución de la sastrería ecuatoriana.',
        sections: [
          {
            id: 'nuestra-historia',
            title: 'Nuestra Historia',
            content: 'Nacidos de una visión familiar en 1999, hemos evolucionado desde un taller local hasta convertirnos en un referente industrial en Ecuador.',
            image: '/corporativas/CORPORATIVA_2.jpg',
            longForm: '<p>La historia de Corporación Impactex es una crónica de perseverancia y adaptación. Comenzamos en Ambato, provincia de Tungurahua, con la misión de fabricar ropa interior que combinara durabilidad y confort. Lo que inició como un proyecto familiar pronto escaló gracias a la visión de nuestros fundadores, integrando procesos de microfibras y elásticos de alta tecnología.</p><p>Hoy, con más de 25 años de trayectoria, nuestras marcas MAO y MPRO son sinónimo de calidad de exportación, llevando con orgullo el sello de Mucho Mejor Ecuador a mercados como México y Estados Unidos.</p>'
          },
          {
            id: 'mision',
            title: 'Nuestra Misión',
            content: 'Transformar el mercado textil ecuatoriano mediante la innovación constante en ropa interior y deportiva para hombre y mujer, y el empoderamiento del talento nacional.',
            image: '/corporativas/MISION_EDITORIAL.png',
            longForm: '<p>Nuestra misión es diseñar, fabricar y comercializar ropa interior y deportiva de alta calidad para hombre y mujer, superando las expectativas de nuestros clientes en estilo, funcionalidad y sostenibilidad. A través de nuestra marca MAO, nos comprometemos a potenciar la industria textil ecuatoriana, asegurando un entorno de trabajo justo, creativo y tecnológicamente avanzado para todos nuestros colaboradores.</p><p>Buscamos que cada persona que use una prenda MAO sienta el respaldo de una ingeniería textil pensada para su ritmo de vida, ya sea en el día a día o en el máximo rendimiento deportivo.</p>'
          },
          {
            id: 'vision',
            title: 'Nuestra Visión',
            content: 'Consolidarnos como el grupo textil líder en la región andina, referente en sostenibilidad y excelencia operativa para 2030.',
            image: '/otras_fotos/IMG_0028.PNG',
            longForm: '<p>Miramos hacia el futuro con la determinación de ser pioneros en la transición hacia una moda plenamente circular. Nuestra visión 2030 proyecta una expansión internacional robusta, apoyada en centros de distribución inteligentes y una huella de carbono neutral en todos nuestros procesos de manufactura.</p><p>Queremos ser la empresa que demuestre al mundo que el talento y la industria de Ambato están a la vanguardia de la innovación global.</p>'
          },
          {
            id: 'nuestro-modelo',
            title: 'Nuestro Modelo',
            content: 'Impactex sostiene un modelo logístico integrado enfocado en la respuesta rápida a las exigencias urbanas en el mercado textil ecuatoriano.',
            image: '/departamentos/SHOWROOM_1.jpg',
            longForm: '<p>Nuestro modelo operativo se basa en la integración vertical completa, desde el diseño conceptual hasta la distribución final. En nuestras plantas de Ambato, hemos implementado sistemas de gestión "Just-in-Time" que nos permiten adaptar nuestras colecciones a las tendencias cambiantes del mercado masculino en tiempo récord.</p>'
          },
          {
            id: 'liderazgo',
            title: 'Liderazgo Ejecutivo',
            content: 'Bajo la presidencia del Dr. Milton Altamirano Mg., Corporación Impactex ha crecido desde un taller familiar en Ambato hasta convertirse en un referente de la industria textil ecuatoriana con proyección internacional.',
            image: '/jefes_area/MILTON.jpeg',
            longForm: '<p><strong>Dr. Milton Altamirano Mg.</strong> — Fundador y Presidente de Corporación Impactex. Con más de 25 años al frente de la compañía, el Dr. Altamirano ha sido el visionario que transformó un pequeño emprendimiento familiar en Tungurahua en una corporación textil de alcance internacional.</p><p>Bajo su liderazgo, en 1999 nació MAO en Ambato, revolucionando el mercado ecuatoriano con una propuesta innovadora de ropa interior elaborada con microfibras y elásticos de alta durabilidad. Su visión estratégica ha llevado a Impactex a exportar a mercados como México, Estados Unidos y Canadá, obteniendo con orgullo el sello de Mucho Mejor Ecuador.</p><p>El Dr. Altamirano cree firmemente en el poder del talento ecuatoriano y en un modelo de gestión horizontal donde cada colaborador tiene voz. Su filosofía de liderazgo se basa en tres pilares: innovación constante, calidad sin concesiones y compromiso genuino con el bienestar de su equipo y su comunidad en Ambato.</p>'
          }
        ]
      },
      'sostenibilidad': {
        title: 'Sostenibilidad',
        subtitle: 'Moda y Conciencia Ambiental.',
        sections: [
          {
            id: 'vision-general',
            title: 'Visión General',
            content: 'Para Impactex, la moda es un lenguaje universal que construye identidad y genera conexión. Guiados por la pasión de crear prendas de calidad a precios accesibles, trabajamos para que nuestras marcas MAO y MPRO acompañen a nuestros clientes en cada etapa de su vida, ajustando nuestra oferta a la demanda real con precisión y agilidad.',
            image: '/otras_fotos/IMG_0033.PNG',
            longForm: '<p>Nuestra visión de sostenibilidad se apoya en tres pilares: innovación, responsabilidad y transparencia. En Impactex, hemos transformado nuestras plantas en Tungurahua para integrar tecnologías de bajo consumo hídrico y sistemas de energía renovable.</p><p>Creemos que la moda de calidad no debe comprometer el futuro de las próximas generaciones. Por ello, cada prenda de MAO y MPRO es el resultado de un proceso consciente que prioriza la salud de nuestros ecosistemas andinos.</p>'
          },
          {
            id: 'hoja-de-ruta',
            title: 'Hoja de Ruta',
            content: 'Estamos decididos a reducir nuestro impacto ambiental protegiendo los recursos naturales de nuestra región. Nuestra hoja de ruta visibiliza los retos que afrontamos para movilizar la innovación y la inversión necesaria en nuevas soluciones que se incorporen a lo largo de toda nuestra cadena de suministro en Ecuador.',
            image: '/otras_fotos/IMG_0032.PNG',
            longForm: '<p>Nuestra hoja de ruta 2026-2030 establece metas ambiciosas para la descarbonización total de nuestra logística y la implementación de un sistema de circuito cerrado para el uso del agua en producción.</p><p>Trabajamos de la mano con proveedores locales para asegurar que el 100% de nuestras fibras principales sean de origen sostenible antes de finalizar la década.</p>'
          },
          {
            id: 'un-nuevo-ciclo',
            title: 'Un Nuevo Ciclo',
            content: 'La transformación comienza en el origen. Apostamos por materias primas de agricultura orgánica y reciclada para avanzar hacia un modelo circular. A través del programa Sustainable Fashion School, formamos a nuestros equipos para integrar la sostenibilidad en el diseño de cada colección de MAO y MPRO.',
            image: '/otras_fotos/IMG_0036.PNG',
            longForm: '<p>El concepto de residuo no existe en nuestra visión circular. Hemos implementado programas de recuperación de excedentes textiles en nuestras plantas de Ambato, transformando lo que antes era desecho en nuevos hilos de alta resistencia para nuestras colecciones de indumentaria deportiva.</p>'
          },
          {
            id: 'produccion',
            title: 'Producción Responsable',
            content: 'Creemos en el potencial de la industria textil como motor de crecimiento en nuestras comunidades. Aplicamos el programa "Trabajador en el centro", promoviendo el bienestar y el empoderamiento de las personas en nuestras plantas de Ambato, asegurando entornos de trabajo seguros y relaciones industriales sólidas.',
            image: '/departamentos/PRODUCCION_6.jpg',
            longForm: '<p>Nuestra gente es el corazón de Impactex. Más allá de cumplir con estándares internacionales de seguridad, fomentamos un entorno de aprendizaje continuo y desarrollo profesional que ha permitido a cientos de familias en Tungurahua progresar junto a nosotros.</p>'
          },
          {
            id: 'distribucion',
            title: 'Distribución Eficiente',
            content: 'Revisamos continuamente nuestra cadena logística para identificar nuevas palancas de eficiencia. Utilizamos energía renovable en nuestros centros de distribución y optimizamos cada envío para maximizar el uso del espacio, reduciendo significativamente nuestra huella de carbono en el transporte nacional.',
            image: '/departamentos/BODEGAPT.jpg',
            longForm: '<p>Nuestra red de distribución nacional opera bajo un modelo de optimización inteligente. El uso de flotas modernas y rutas planificadas mediante algoritmos nos permite reducir drásticamente los kilómetros recorridos en vacío, minimizando nuestro impacto ambiental en las carreteras del país.</p>'
          },
          {
            id: 'entorno',
            title: 'Entorno y Biodiversidad',
            content: 'Estamos comprometidos con la regeneración de los ecosistemas. Colaboramos en proyectos de protección de la biodiversidad y restauración de suelos, entendiendo que la salud del medio ambiente es fundamental para la purificación del agua y la regulación del clima en las regiones donde operamos.',
            image: '/otras_fotos/IMG_0034.PNG',
            longForm: '<p>Impactex no solo produce moda; protege la vida. Nuestra planta principal está rodeada de zonas de recuperación de flora nativa. Hemos implementado un sistema de monitoreo constante de la calidad del aire y del agua, devolviendo a la naturaleza recursos en las mismas o mejores condiciones en que los recibimos.</p>'
          },
          {
            id: 'reporting',
            title: 'Reporting',
            content: 'Evaluaciones mensuales de impacto auditadas independientemente.',
            image: '/otras_fotos/IMG_0030.PNG'
          }
        ]
      },
      'talento': {
        title: 'Talento Humano',
        subtitle: 'Crece dentro del Hub Indumentario del país.',
        sections: [
          {
            id: 'vida-en-impactex',
            title: 'Vida en Impactex',
            content: 'Entornos libres, horizontales y enfocados a la máxima creatividad.',
            image: '/jefes_area/PASANTES.jpg',
            longForm: '<p>Vivir Impactex es ser parte de una comunidad apasionada por la excelencia. Ofrecemos espacios de trabajo modernos, programas de bienestar integral y una cultura que celebra la diversidad y el talento individual en cada departamento.</p>'
          },
          {
            id: 'equipos',
            title: 'Nuestros Equipos',
            content: 'Diseñadores, logísticos y financieros, unidos por la vanguardia.',
            image: '/jefes_area/JEFEPRODUCCION.jpg',
            longForm: '<p>Desde el equipo creativo que conceptualiza las marcas MAO y MPRO hasta los expertos logísticos que aseguran que el producto llegue al showroom, cada colaborador es una pieza clave en nuestro motor industrial. Fomentamos la colaboración interdisciplinaria para resolver retos complejos con soluciones innovadoras.</p>'
          }
        ]
      },
      'informacion': {
        title: 'Información Corporativa',
        subtitle: 'Centro de Resoluciones Legales y Contacto.',
        sections: [
          {
            id: 'cookies',
            title: 'Directiva de Cookies',
            content: 'Utilizamos cookies propias y de terceros para entender cómo interactúas con nuestra web y asegurar una experiencia robusta y segura.',
            image: '/otras_fotos/IMG_0027.PNG',
            longForm: '<p><strong>¿Qué son las cookies?</strong> Una cookie es un pequeño fichero de texto que se descarga en su equipo al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p><p>En Impactex utilizamos cookies técnicas (esenciales), analíticas (para estadísticas internas) y de personalización (para recordar sus preferencias como el idioma).</p>'
          },
          {
            id: 'legal',
            title: 'Aviso Legal',
            content: 'Impactex opera todos sus dominios digitales bajo absoluta rigurosidad legal y acatando la ley de protección de datos personales.',
            image: '/otras_fotos/IMG_0029.PNG',
            longForm: '<p>El presente Aviso Legal regula el acceso y la utilización del portal web de Corporación Impactex. El acceso a la web implica la aceptación sin reservas del presente Aviso Legal.</p><p>Todos los contenidos del sitio (textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente) constituyen una obra cuya propiedad pertenece a Impactex o a sus licenciantes.</p>'
          },
          {
            id: 'privacidad',
            title: 'Política de Privacidad',
            content: 'Resguardamos tu información celosamente bajo las leyes de protección de datos de Ecuador.',
            image: '/otras_fotos/protecciondatos.PNG',
            longForm: '<p>De conformidad con la Ley Orgánica de Protección de Datos Personales, Impactex se compromete a tratar sus datos con confidencialidad y a utilizarlos únicamente para las finalidades informadas. Usted tiene derecho a acceder, rectificar o suprimir sus datos enviando un correo a protecciondatos@corporacionimpactex.com.</p>'
          }
        ]
      }
    };
  }
}
