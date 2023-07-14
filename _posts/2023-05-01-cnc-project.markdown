---
layout: post
title: 'Homemade 3-Axis CNC Machine'
categories: 
math: true
date: '2023-05-01'
---
<img id="Figure 1" src="/images/thumbs/cnc_thumb.jpeg" class="fit image">

<p><b>Figure 1</b></p>

### Background & Context ###

When I was 15yrs old, I spent about a year developing this budget CNC machine from scratch. At the time, consumer grade CNC machines, 3D printers, and their corresponding components were not yet commonly available. This meant that to build a machine of this size with good performances, all while keeping costs low, was a major challenge. Nevertheless, I was determined.

I designed this machine to be built from commonly available hardware store items. The overall structure of the machine is made of MDF &#151; a dimensionally stable, vibration damping, and low-cost material &#151; as well as standard &frac14;" - 20 threaded rods, and a Dremel rotary tool for the spindle.

For actuation of the machine, each axis is driven by a stepper motor via the &frac14;" - 20 threaded rods. And each motor is driven by some high power, custom motor controllers. The stepper motors were found through a liquidation sale, which meant that they came with minimal information on their specification. These cheap motors later posed many challenges to the design of the motor controller and the motion control algorithm, which will be the primary scope of this post.

The resulting system is exceptionally low-cost, but achieving this required overcoming many design challenges.

### Challenges ###

Almost all of the challenges arise from using less than optimal components for the drive trains. First, we have the &frac14;" - 20 threaded rods, which are really not optimal for driving linear motion. It is slow, as it requires many revolutions from the actuating motor to move a given distance (Note that the '20' denotes the number of revolutions per inch). In other words, it requires fast stepping from the stepper motors to move the machine effectively. In addition they also tend to be quite stiff to drive: to combat backlash, I used plastic nuts with very tight thread meshing along each axis, which in turn creates a lot of friction. The consequence of this is that the drive train requires moderately high driving torque (proportional to current) from the motors to avoid stalling.

<img id="Figure 2" src="/images/fulls/cnc/challenges.jpg" class="fit image">

<p><b>Figure 2: </b> major sources of challenges</p>

The problem is really compounded by the fact that we have these cheap stepper motors with relatively poor specifications. These motors have high inductances and low resistances which result in large characteristic time constants &#151; slow actuation. At the same time, they are unable to handle large steady-state currents which aid in providing driving torque.

The result of all of this is that the custom driver circuits need to be high-powered and sophisticated with its timing and driving sequence to use the motors effectively. 

### System Overview ###

In this section, I will be introducing an overview of the system and discuss the scope of this post.

First, we will not be examining the mechanical portion of the system. Instead, we will only be examining the electrical portion of the system. Here is an overview diagram of the electrical system: 

<img id="Figure 3" src="/images/fulls/cnc/system_overview.jpg" class="fit image">

<p><b>Figure 3: </b> electrical system overview</p>

Starting from the left, we have a PC, which takes 3D models/tool paths and convert the machine operations into G-Code via a G-Code sender. The G-Code sender sends the information by USB or parallel port interface to a hardware implemented G-Code translator, which is responsible for servicing user interfaces as well as distributing the drive signals to the motor controllers responsible for controlling each axis of the machine. Each axis of the machine is controlled by one MCU, two H-bridges, and a stepper motor. For this post, we will primarily be focusing on the portion of the system circled in red.

### Problem ###

Let's discuss our design problem.

I mentioned earlier that I acquired these mystery stepper motors with poor specifications. Here I am showing how I first identified the issue.

<section id="gallery1">
<div class="row 25%">
    <article class="6u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sys_id_step1.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sys_id_step1.jpeg" alt="" /></a>
        <p style="text-align: center;">a) \(\tau = 368 \mu s, \; R_{ext}=8.2 \Omega \)</p>
    </article>
    <article class="6u$ 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sys_id_step2.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sys_id_step2.jpeg" alt="" /></a>
        <p style="text-align: center;">b) \(\tau = 168 \mu s, \; R_{ext}=4 \Omega \)</p>
    </article>
    <p id="Figure 4"><b>Figure 4:</b> identification of motor parameters through step response</p>
</div>

</section>

As a starting point, I performed some system identification on the motors. Using step inputs and observing the response from the motors, I was able to determine its characteristic parameters. Assume a first-order approximation defined by:

$$
\tau = \frac{L_{0}}{R_{0}+R_{ext}}
$$

, where \\\(R_{ext}\\\) is an external resistor connected in series with the motor winding and \\\(L_{0}\\\) and \\\(R_{0}\\\) are the characteristic inductance and resitance of the motor winding. We see that these values come out to:

$$
\tau = 4.2 ms, \; L_{0}=1.61mH, \: R_{0}=0.387\Omega
$$

, and that the time constant is very large! 

What does this mean in the larger scope of our problem?

The large time constant of the stepper motors means that it is difficult to actuate them quickly at low voltages. While high voltages correspond to faster actuation, they also lead to excessive winding currents at steady state; and the stepper motors cannot handle high steady-state currents.

With some napkin math, we figure out that without any special circuitry, the machine is incredibly slow. Recall that each axis requires 20 revolutions to move one inch, and that the stepper motors take 200 steps to make one full rotation. It takes 4000 steps from a motor to move the machine by 1 inch. Assuminging that we require \\\(3\tau\\\) for full actuation &#151; it would take the machine more than 10min to move from one end to the other!

This is far too slow of a feed or milling rate. As a general discussion of milling rate: feed rates that are too low, especially in the context of spindle runout (as is very much true for a Dremel rotary tool), tend to lead to burning of softer materials; and feed rates that are too high tend to cause chatter, breaking bits, and general bad dimensions.

### Solution ###

It turns out, the solution is principally quite simple...

Consider the plot below of the motor winding current when actuated using different voltages (1.5v, 9v, 24v)

<img id="Figure 5" src="/images/fulls/cnc/exponential_motor_current.jpg" class="fit image">

<p><b>Figure 5: </b> motor currents when driven with varied voltages</p>

At the lowest actuation voltage, we have 1.5V, which is about the maximum permissible DC-voltage for driving these motors. The rise time to reach the desired target current is about 12.5ms. Suppose for a second, we are allowed to use higher actuation voltages. With higher actuation voltages, the motor winding reaches the same target current at much faster rates. For the case of using 24V, the rise time is 50x faster.

By using a feedback loop and switching the applied voltage ON & OFF appropriately, we are actually allowed to use these higher voltages without generating excessive steady state dissipation on the motor windings. The name of this implementation is "Chopper drive", which is a sort of constant-current based driver.

Refer to Figure 6. This is a simplified illustration of a feedback loop using a shunt resistor. At \\\(V_{S}\\\), the load is supplied a voltage much higher than what it permissible at steady state. The load is prevented from drawing excessive currents by the feedback loop comprised of a sense resistor and comparator. 

<img id="Figure 5" src="/images/fulls/cnc/simplified_FB.jpg" class="fit image">

<p><b>Figure 6: </b> simplified current-feedback loop</p>

Note that in real applications, special attention is made around 'turn-off' of the inductive load. Examples of these measures:

<ul>
    <li>"fast-decay"</li>
    <li>"slow-decay"</li>
    <li>Mixed, etc.</li>
</ul>

.... more


### References ###

Heike Vallery and Arend L. Schwab, “Advanced Dynamics”, 3rd edition, Delft University of Technology, 2020, ISBN/EAN 978-90-8309-060-3

Steven H. Strogatz, "Nonlinear Dynamics and Chaos: With Applications in Physics, Biology, Chemistry, and Engineering", Addison-Wesley Pub., 2000, ISBN 9780201543445 