// =====================================
// CANVAS
// =====================================

const canvas =
    document.getElementById("fractalCanvas");

const ctx =
    canvas.getContext("2d");


// =====================================
// DEFAULT VALUES
// =====================================

const DEFAULT_ITERATION = 6;
const DEFAULT_ANGLE = 25;
const DEFAULT_RATIO = 0.70;
const DEFAULT_COLOR = "#20c965";


// =====================================
// DOM ELEMENTS
// =====================================

const fractalType =
    document.getElementById("fractalType");

const iterationSlider =
    document.getElementById("iteration");

const iterationValue =
    document.getElementById("iterationValue");

const angleSlider =
    document.getElementById("angle");

const angleValue =
    document.getElementById("angleValue");

const ratioSlider =
    document.getElementById("ratio");

const ratioValue =
    document.getElementById("ratioValue");

const colorInput =
    document.getElementById("color");

const angleControl =
    document.getElementById("angleControl");

const ratioControl =
    document.getElementById("ratioControl");


// =====================================
// FRACTAL TREE
// =====================================

function drawBranch(
    x,
    y,
    length,
    angle,
    iteration,
    ratio,
    branchAngle,
    color
) {

    // BASE CASE
    if (iteration <= 0) {
        return;
    }


    // Konversi derajat ke radian
    const radians =
        angle * Math.PI / 180;


    // Titik akhir cabang
    const endX =
        x + Math.cos(radians) * length;

    const endY =
        y - Math.sin(radians) * length;


    // Gambar cabang
    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.lineTo(endX, endY);

    ctx.strokeStyle = color;

    ctx.lineWidth =
        Math.max(1, iteration * 0.8);

    ctx.lineCap = "round";

    ctx.stroke();


    // RECURSIVE CASE
    // Cabang kiri

    drawBranch(
        endX,
        endY,
        length * ratio,
        angle - branchAngle,
        iteration - 1,
        ratio,
        branchAngle,
        color
    );


    // Cabang kanan

    drawBranch(
        endX,
        endY,
        length * ratio,
        angle + branchAngle,
        iteration - 1,
        ratio,
        branchAngle,
        color
    );
}


// =====================================
// SIERPIŃSKI TRIANGLE
// =====================================

function drawSierpinski(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    iteration,
    color
) {

    // BASE CASE
    if (iteration <= 0) {

        ctx.beginPath();

        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);

        ctx.lineTo(x3, y3);

        ctx.closePath();

        ctx.fillStyle = color;

        ctx.fill();

        return;
    }


    // Titik tengah sisi pertama
    const mx12 =
        (x1 + x2) / 2;

    const my12 =
        (y1 + y2) / 2;


    // Titik tengah sisi kedua
    const mx23 =
        (x2 + x3) / 2;

    const my23 =
        (y2 + y3) / 2;


    // Titik tengah sisi ketiga
    const mx31 =
        (x3 + x1) / 2;

    const my31 =
        (y3 + y1) / 2;


    // RECURSIVE CASE

    // Segitiga kiri
    drawSierpinski(
        x1,
        y1,
        mx12,
        my12,
        mx31,
        my31,
        iteration - 1,
        color
    );


    // Segitiga kanan
    drawSierpinski(
        mx12,
        my12,
        x2,
        y2,
        mx23,
        my23,
        iteration - 1,
        color
    );


    // Segitiga atas
    drawSierpinski(
        mx31,
        my31,
        mx23,
        my23,
        x3,
        y3,
        iteration - 1,
        color
    );
}


// =====================================
// KOCH LINE
// =====================================

function drawKochLine(
    x1,
    y1,
    x2,
    y2,
    iteration
) {

    // BASE CASE
    if (iteration <= 0) {

        ctx.lineTo(x2, y2);

        return;
    }


    // Sepertiga panjang garis
    const dx =
        (x2 - x1) / 3;

    const dy =
        (y2 - y1) / 3;


    // Titik A
    const ax =
        x1 + dx;

    const ay =
        y1 + dy;


    // Titik B
    const bx =
        x1 + 2 * dx;

    const by =
        y1 + 2 * dy;


    // Sudut 60 derajat
    const angle =
        Math.PI / 3;


    // Titik puncak
    const px =
        ax +
        dx * Math.cos(angle) -
        dy * Math.sin(angle);

    const py =
        ay +
        dx * Math.sin(angle) +
        dy * Math.cos(angle);


    // RECURSIVE CASE

    drawKochLine(
        x1,
        y1,
        ax,
        ay,
        iteration - 1
    );

    drawKochLine(
        ax,
        ay,
        px,
        py,
        iteration - 1
    );

    drawKochLine(
        px,
        py,
        bx,
        by,
        iteration - 1
    );

    drawKochLine(
        bx,
        by,
        x2,
        y2,
        iteration - 1
    );
}


// =====================================
// KOCH SNOWFLAKE
// =====================================

function drawKochSnowflake(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    iteration,
    color
) {

    ctx.beginPath();

    ctx.moveTo(x1, y1);


    drawKochLine(
        x1,
        y1,
        x2,
        y2,
        iteration
    );


    drawKochLine(
        x2,
        y2,
        x3,
        y3,
        iteration
    );


    drawKochLine(
        x3,
        y3,
        x1,
        y1,
        iteration
    );


    ctx.strokeStyle = color;

    ctx.lineWidth = 2;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.stroke();
}


// =====================================
// GENERATE FRACTAL
// =====================================

function generateFractal() {

    // Bersihkan canvas
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Ambil input
    const iteration =
        Number(iterationSlider.value);

    const angle =
        Number(angleSlider.value);

    const ratio =
        Number(ratioSlider.value);

    const color =
        colorInput.value;


    // =================================
    // TREE
    // =================================

    if (fractalType.value === "tree") {

        drawBranch(
            canvas.width / 2,
            canvas.height,
            150,
            90,
            iteration,
            ratio,
            angle,
            color
        );
    }


    // =================================
    // SIERPIŃSKI
    // =================================

    else if (
        fractalType.value === "sierpinski"
    ) {

        drawSierpinski(
            70,
            canvas.height - 50,

            canvas.width - 70,
            canvas.height - 50,

            canvas.width / 2,
            45,

            iteration,
            color
        );
    }


    // =================================
    // KOCH
    // =================================

    else if (
        fractalType.value === "koch"
    ) {

        drawKochSnowflake(
            canvas.width / 2,
            50,

            canvas.width - 80,
            canvas.height - 100,

            80,
            canvas.height - 100,

            iteration,
            color
        );
    }


    // Update statistik
    updateStats();
}


// =====================================
// UPDATE CONTROLS
// =====================================

function updateControls() {

    if (fractalType.value === "tree") {

        angleControl.style.display = "block";

        ratioControl.style.display = "block";

    } else {

        angleControl.style.display = "none";

        ratioControl.style.display = "none";
    }
}


// =====================================
// UPDATE STATISTICS
// =====================================

function updateStats() {

    const iteration =
        Number(iterationSlider.value);

    const angle =
        Number(angleSlider.value);

    const ratio =
        Number(ratioSlider.value);

    const type =
        fractalType.value;


    // Iterasi
    document.getElementById(
        "statIteration"
    ).textContent = iteration;


    const label2 =
        document.getElementById(
            "statLabel2"
        );

    const value2 =
        document.getElementById(
            "statValue2"
        );

    const label3 =
        document.getElementById(
            "statLabel3"
        );

    const value3 =
        document.getElementById(
            "statValue3"
        );

    const label4 =
        document.getElementById(
            "statLabel4"
        );

    const value4 =
        document.getElementById(
            "statValue4"
        );

    const description =
        document.getElementById(
            "statsDescription"
        );


    // =================================
    // TREE
    // =================================

    if (type === "tree") {

        label2.textContent =
            "Sudut";

        value2.textContent =
            angle + "°";


        label3.textContent =
            "Rasio";

        value3.textContent =
            ratio.toFixed(2);


        label4.textContent =
            "Cabang";


        // Pohon biner penuh
        const branches =
            Math.pow(2, iteration) - 1;

        value4.textContent =
            branches;


        description.textContent =
            "Pertumbuhan struktur pohon biner secara rekursif.";
    }


    // =================================
    // SIERPIŃSKI
    // =================================

    else if (type === "sierpinski") {

        label2.textContent =
            "Pola";

        value2.textContent =
            "3ⁿ";


        label3.textContent =
            "Segitiga";


        const triangles =
            Math.pow(3, iteration);

        value3.textContent =
            triangles;


        label4.textContent =
            "Lubang";


        const holes =
            Math.max(
                0,
                (Math.pow(3, iteration) - 1) / 2
            );

        value4.textContent =
            holes;


        description.textContent =
            "Setiap tahap menghasilkan tiga sub-segitiga baru.";
    }


    // =================================
    // KOCH
    // =================================

    else if (type === "koch") {

        label2.textContent =
            "Pola";

        value2.textContent =
            "4ⁿ";


        label3.textContent =
            "Segmen";


        const segments =
            3 * Math.pow(4, iteration);

        value3.textContent =
            segments;


        label4.textContent =
            "Skala";


        const scale =
            Math.pow(
                3 / 4,
                iteration
            );

        value4.textContent =
            scale.toFixed(3) + "×";


        description.textContent =
            "Setiap segmen garis berkembang menjadi empat segmen baru.";
    }
}


// =====================================
// ITERATION SLIDER
// =====================================

iterationSlider.addEventListener(
    "input",
    function () {

        iterationValue.textContent =
            this.value;

        generateFractal();
    }
);


// =====================================
// ANGLE SLIDER
// =====================================

angleSlider.addEventListener(
    "input",
    function () {

        angleValue.textContent =
            this.value + "°";

        generateFractal();
    }
);


// =====================================
// RATIO SLIDER
// =====================================

ratioSlider.addEventListener(
    "input",
    function () {

        ratioValue.textContent =
            Number(this.value).toFixed(2);

        generateFractal();
    }
);


// =====================================
// COLOR
// =====================================

colorInput.addEventListener(
    "input",
    function () {

        generateFractal();
    }
);


// =====================================
// FRACTAL TYPE
// =====================================

fractalType.addEventListener(
    "change",
    function () {

        updateControls();

        generateFractal();
    }
);


// =====================================
// GENERATE BUTTON
// =====================================

document
    .getElementById("generateBtn")
    .addEventListener(
        "click",
        function () {

            generateFractal();
        }
    );


// =====================================
// DOWNLOAD
// =====================================

document
    .getElementById("downloadBtn")
    .addEventListener(
        "click",
        function () {

            const link =
                document.createElement("a");


            link.download =
                "fractaart-" +
                fractalType.value +
                ".png";


            link.href =
                canvas.toDataURL(
                    "image/png"
                );


            link.click();
        }
    );


// =====================================
// RESET
// =====================================

document
    .getElementById("resetBtn")
    .addEventListener(
        "click",
        function () {

            // Kembalikan jenis
            fractalType.value =
                "tree";


            // Kembalikan slider
            iterationSlider.value =
                DEFAULT_ITERATION;

            angleSlider.value =
                DEFAULT_ANGLE;

            ratioSlider.value =
                DEFAULT_RATIO;


            // Kembalikan warna
            colorInput.value =
                DEFAULT_COLOR;


            // Kembalikan tampilan nilai
            iterationValue.textContent =
                DEFAULT_ITERATION;

            angleValue.textContent =
                DEFAULT_ANGLE + "°";

            ratioValue.textContent =
                DEFAULT_RATIO.toFixed(2);


            // Kembalikan kontrol
            updateControls();


            // Gambar ulang
            generateFractal();
        }
    );


// =====================================
// INITIALIZATION
// =====================================

updateControls();

updateStats();

generateFractal();