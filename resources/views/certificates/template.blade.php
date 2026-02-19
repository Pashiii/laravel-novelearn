<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        @page {
            size: A4 portrait;
            margin: 0;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: "Times New Roman", serif;
            position: relative;
            width: 100%;
            height: 100%;
        }

        /* Background image */
        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }

        /* Center container */
        .container {
            position: absolute;
            width: 100%;
            top: 45%;
            transform: translateY(50%);
            text-align: center;
            color: #000;
        }

        /* Recipient name */
        .name {
            font-family: "Old English Text MT", serif;
            font-style: italic;
            font-size: 48px;
            margin-bottom: 10px;
        }

        .course,
        .date,
        .venue {
            font-size: 22px;
            margin: 5px 0;
        }

        /* Footer */
        .footer {
            position: absolute;
            bottom: 200px;
            width: 100%;
            text-align: center;
            color: green;

        }

        .footer h3 {
            margin: 0;
            font-size: 30px;

        }

        .footer p {
            margin: 0;
            font-size: 16px;
        }
    </style>
</head>

<body>

    {{-- Background --}}
    @if($background)
        <img src="{{ public_path('storage/' . $background) }}" class="background">
    @endif

    {{-- Main Content --}}
    <div class="container">
        <div class="name">{{ $student->full_name }}</div>

        <div class="course">
            For having completed {{ $hours }} hours of
        </div>

        <div class="course">
            <strong>{{ $course_title }}</strong>
        </div>

        <div class="date">
            Given this {{ \Carbon\Carbon::parse($event_date)->format('jS') }}
            of {{ \Carbon\Carbon::parse($event_date)->format('F Y') }}
        </div>

        <div class="venue">
            at {{ $venue }}
        </div>
    </div>

    {{-- Footer --}}
    <div class="footer" style="left: -20%;">
        <h3>{{ $admin_name }}</h3>
        <p>NCLC Administrator</p>
    </div>

    <div class="footer" style="left: 15%;">
        <h3>{{ $mayor_name }}</h3>
        <p>Municipal Mayor</p>
    </div>

</body>

</html>