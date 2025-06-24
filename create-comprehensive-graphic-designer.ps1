$jobData = @{
    title = "Graphic Designer"
    department = "Design"
    location = "Ho Chi Minh City, Vietnam"
    heritage = @"
Founded with roots in Danish agency expertise, Tony Tech Insights brings European-standard services to Vietnam and beyond. We combine international best practices with local insights to deliver exceptional value to our clients.

Our unique perspective allows us to bridge cultural and technological gaps, creating solutions that resonate globally while addressing specific regional needs.
"@
    culture = @{
        description = "At Tony Tech Insights, we foster a culture of innovation, collaboration, and continuous learning. Our team thrives in an environment where:"
        values = @(
            "Honesty and transparency guide all our interactions",
            "Conscientiousness ensures we deliver our best work", 
            "Respect for diverse perspectives drives innovation"
        )
    }
    responsibilities = @(
        "Mainly work with jobs at advanced and standard level",
        "Responsible for the quality of specific jobs",
        "Strictly follow the timeline and ensure all the jobs involved meet the client's deadline",
        "Strictly follow the rules and policy as well as the working structures of the company",
        "Fully understanding of rules and principles of the client's brand guidelines"
    )
    requirements = @(
        "At least 1 - 3 years of experience in the Graphic Design field",
        "Proficient in tools such as Indesign, Illustrator, Photoshop, Acrobat, Premiere Pro, After Effects, Powerpoint, etc.",
        "Meticulous and attentive to detail, ensuring accuracy in all tasks",
        "Adaptable and willing to take on various assignments without being overly selective",
        "Open-minded, and receptive to new ideas and perspectives",
        "Committed to continuous learning, constantly seeking opportunities for personal and professional growth",
        "Capable of working effectively in a team and collaborating with others to finish projects",
        "Have job management abilities, specifically flexible scheduling, time management, and progress tracking of to-do lists",
        "A strong skill set in motion graphics is crucial for professionals in the field"
    )
    workingSchedule = @{
        description = "Standard office hour:"
        hours = "Main shift: 8.00 AM - 4.30 PM"
    }
    benefits = @(
        "Compulsory insurances over full salary",
        "Working 7.5 hours/day, from Monday to Friday",
        "Convenient office with a nice peaceful view",
        "Pantry station for tea, coffee and snack lovers",
        "Interesting team bonding activities",
        "12 days of annual leaves per year with 1 extra day added every year, and can be moving forward to end of July of the next year",
        "Performance review every 6 months with related training that's most suitable with your career path",
        "Computer, software and hardware to be provided"
    )
    callToAction = @"
Would you like to join us on our journey?

If you think that you would be a great fit for our role, please apply by submitting your information including CV and portfolio to contact@tonytechinsights.com, or apply via this post.
"@
    icon = "Users"
}

$jsonBody = $jobData | ConvertTo-Json -Depth 4

try {
    Write-Host "Creating comprehensive Graphic Designer position..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/jobpositions" -Method POST -Body $jsonBody -ContentType "application/json"
    Write-Host "Successfully created comprehensive Graphic Designer position!" -ForegroundColor Green
    Write-Host "Position ID: $($response.position.id)" -ForegroundColor Cyan
    Write-Host "Total positions now: $($response.totalPositions)" -ForegroundColor Cyan
} catch {
    Write-Host "Error creating position: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response body: $responseBody" -ForegroundColor Red
    }
} 