---
layout: post
title: 'Homemade 3-Axis CNC Machine'
categories: 
math: true
date: '2023-05-01'
---
<img id="Figure 1" src="/images/thumbs/cnc_thumb.jpeg" class="fit image">

<p><b>Figure 1</b>; Videos:</p>
<div class="row 25%">
    <article class="3u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="https://youtube.com/shorts/Q_CU4RbIb-Y?feature=share" data-poprox="youtube" class="image vid fit thumb" style="margin: 0.35em auto;">
            <img src="/images/fulls/cnc/cnc1.jpeg" 
                    title="Z-axis Demo"
            />
        </a>
        <p style="text-align: center;">a) Z-axis Demo</p>
    </article>
     <article class="3u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="https://youtu.be/dEmZWj5OCsA" data-poprox="youtube" class="image vid fit thumb" style="margin: 0.35em auto;">
            <img src="/images/fulls/cnc/MDF_milling.jpeg" 
                    title="MDF Milling Demo"
            />
        </a>
        <p style="text-align: center;">b) MDF Milling Demo</p>
    </article>
</div>

### Introduction ###

When I was 15yrs old, I spent about a year developing this budget CNC machine from scratch. At the time, consumer grade CNC machines, 3D printers, and their corresponding components were not yet commonly available. This meant that to build a machine of this size with good performances, all while keeping costs low, was a major challenge. Nevertheless, I was determined...

I designed this machine to be built from commonly available hardware store items. The overall structure of the machine is made of MDF &#151; a dimensionally stable, vibration damping, and low-cost material &#151; as well as standard &frac14;" - 20 threaded rods, and a Dremel rotary tool for the spindle.

For actuation of the machine, each axis is driven by a stepper motor via the &frac14;" - 20 threaded rods. And each motor is driven by some high power, custom motor controllers. The stepper motors were found through a liquidation sale, which meant that they came with minimal information on their specification. These cheap motors later posed many challenges to the design of the motor controller and the motion control algorithm, which will be the primary scope of this post.

The resulting system is exceptionally low-cost, but achieving this required overcoming many design challenges.

### Challenges ###

Almost all of the challenges arise from using less than optimal components for the drive trains. First, we have the &frac14;" - 20 threaded rods, which are really not optimal for driving linear motion. It is slow, as it requires many revolutions from the actuating motor to move a given distance (Note that the '20' denotes the number of revolutions per inch). In other words, it requires fast stepping from the stepper motors to move the machine effectively. In addition they also tend to be quite stiff to drive: to combat backlash, I used plastic nuts with very tight thread meshing along each axis, which in turn creates a lot of friction. The consequence of this is that the drive train requires moderately high driving torque (proportional to current) from the motors to avoid stalling.
<div>
<img id="Figure 2" src="/images/fulls/cnc/challenges.jpg" class="fit image">
<p><b>Figure 2: </b> major sources of challenges</p>
</div>

The problem is really compounded by the fact that we have these cheap stepper motors with relatively poor specifications. These motors have high inductances and low resistances which result in large characteristic time constants &#151; slow actuation. At the same time, they are unable to handle large steady-state currents which aid in providing driving torque.

The result of all of this is that the custom driver circuits need to be high-powered and sophisticated with its timing and driving sequence to use the motors effectively. 

### System Overview ###

In this section, I will be introducing an overview of the system and discuss the scope of this post.

First, we will not be discussing the mechanical design of the system. Instead, we will only be examining the electrical portion of the system. Here is an overview diagram of the electrical system: 

<div>
<img style="margin-bottom: 0" id="Figure 3" src="/images/fulls/cnc/system_overview.jpg" class="fit image">
<p><b>Figure 3: </b> electrical system overview</p>
</div>

Starting from the left, we have a PC, which takes 3D models/tool paths and convert the machine operations into G-Code via a G-Code sender. The G-Code sender sends the information by USB or parallel port interface to a hardware implemented G-Code translator, which is responsible for servicing user interfaces as well as distributing the drive signals to the motor controllers responsible for controlling each axis of the machine. Each axis of the machine is controlled by one MCU, two H-bridges, and a stepper motor. For this post, we will primarily be focusing on the portion of the system circled in red.

### Problem ###

Let's discuss our design problem.

I mentioned earlier that I acquired these mystery stepper motors with poor specifications. The problem was first identified when I performed a system identification on the motors. Using step inputs and observing the response from the motors, I was able to determine its characteristic parameters \\\(L_{0}\\\) and \\\(R_{0}\\\). Assume a first-order approximation, the system under test can be characterized by:

$$
\tau_{test} = \frac{L_{0}}{R_{0}+R_{ext}}
$$

, where \\\(R_{ext}\\\) is an external resistor connected in series with the motor winding and \\\(L_{0}\\\) and \\\(R_{0}\\\) are the characteristic inductance and resitance of the motor winding. By testing the system with different values of \\\(R_{ext}\\\), and measuring the motor current over time &#151; to determine the corresponding time constant \\\(\tau_{ext}\\\) &#151; we can calculate for \\\(L_{0}\\\) and \\\(R_{0}\\\). Using measurements shown in Figure 4, the values come out to:

$$
\tau = {L_{0}}/{R_{0}} = 4.2 ms, \; L_{0}=1.61mH, \: R_{0}=0.387\Omega
$$

, and we see that the characteristic time constant is very large! 

<section id="gallery1">
<div class="row 25%">
    <article class="6u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sys_id_step1.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sys_id_step1.jpeg" alt="" /></a>
        <p style="text-align: center;">a) \(\tau_{test} = 368 \mu s, \; R_{ext}=8.2 \Omega \)</p>
    </article>
    <article class="6u$ 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sys_id_step2.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sys_id_step2.jpeg" alt="" /></a>
        <p style="text-align: center;">b) \(\tau_{test} = 168 \mu s, \; R_{ext}=4 \Omega \)</p>
    </article>
    <p id="Figure 4"><b>Figure 4:</b> identification of motor parameters through step response</p>
</div>

</section>

In a broader scope, the large time constant means that it is difficult to actuate the motor windings quickly at <em>low voltages</em>. While high voltages correspond to faster actuation, they also lead to excessive winding currents at steady state; and the stepper motors are not designed to handle high steady-state currents.

With some napkin math, we figure out that &#151; without any special circuitry &#151; <em>the machine is incredibly slow. </em> Recall that each axis requires 20 revolutions to move one inch, and that the stepper motors take 200 steps to make one full rotation. In other words, each axis requires 4000 steps from a motor to move 1 inch. Assuming \\\(3\tau\\\) (corresponds to 95% of steady state current) for full actuation, <b>it would take the machine more than 10min to move from one end to the other!</b>

This is far too slow of a milling rate. As a general discussion of milling rate: feed rates that are too low, especially in the context of spindle runout (as is very much true for a Dremel rotary tool), tend to lead to burning of softer materials; and feed rates that are too high tend to cause chatter, breaking bits, and general bad dimensions.

### Solution ###
<p>
It turns out, the solution is principally quite simple... <br>

Consider the plot below of the motor winding current when actuated using different voltages (1.5V, 9V, 24V)
</p>

<div>
<img id="Figure 5" src="/images/fulls/cnc/exponential_motor_current.jpg" class="fit image">
<p><b>Figure 5: </b> motor currents when driven with varied voltages</p>
</div>

At the lowest actuation voltage, we have 1.5V, which is about the maximum permissible DC-voltage for driving these motors. The rise time to reach the desired target current is about 12.5ms. 

Suppose for a second, we are allowed to use higher actuation voltages. With higher actuation voltages, the motor winding reaches the same target current at much faster rates. For the case of using 24V, the rise time is 0.25ms, or <em>50x faster.</em>

By using a feedback loop and switching the applied voltage ON & OFF appropriately, we are actually allowed to use these higher voltages without generating excessive steady state dissipation on the motor windings. The name of this implementation is "Chopper drive", which is a sort of constant-current based driver.

A simplified illustration of such a feedback loop is illustrated in Figure 6. At \\\(V_{S}\\\), the load is supplied a voltage much higher than what it permissible at steady state (e.g. 24V). A sense resistor on the "low-side" is used to measure the current flow through the load and a comparator detects when this current rises past a pre-set level. When triggered, the comparator cuts off the rising flow of current, thereby regulating the load and forming a current feedback loop.

<div>
<img style="margin-bottom: 0" id="Figure 6" src="/images/fulls/cnc/simplified_FB.jpg" class="fit image">
<p><b>Figure 6: </b> simplified current-feedback loop <a href="#references"><sup>[1]</sup></a></p>
</div>

Note that in real applications, special attention is made around 'turn-off' of the inductive load. Some example techniques for managing the current flow during 'turn-off' are listed below: 

<ul>
    <li>"fast-decay"</li>
    <li>"slow-decay"</li>
    <li>Mixed, etc.</li>
</ul>

These methods will be discussed more in depth in the following sections.

### Implementation ###

I will first discuss the basic implementation of the motor controllers, including the current-feedback loop. Afterwards, we will take a look at improvements which substantially improve the performance of the overall system.

#### The Basics ####
<div>
<img style="margin-bottom: 0" id="Figure 7" src="/images/fulls/cnc/system_diagram_per_axis_16_9.jpeg" class="fit image">
<p><b>Figure 7: </b>system diagram per axis</p>
</div>
Above is a subsystem diagram for each axis. Recall that each motor or axis requires:

<ul>
<li>2 \(\times \) (H-bridge + H-bridge driver)</li>
<li>1 \(\times \) (MCU)</li>
</ul>

, and Figure 8 shows the bench testing setup for a prototype of this subsystem:

<div>
<img style="margin-bottom: 0" id="Figure 8" src="/images/fulls/cnc/overview_per_axis_4_3.jpeg" class="fit image">
<p><b>Figure 8: </b>overview per axis</p>
</div>

Each H-bridge is composed of 4 high-power N-MOSFETs. The H-bridge driver (located in the center of each H-bridge circuit) is responsible for driving the external MOSFETs as well as measuring current flow through the circuit and detecting error conditions. The MCU is responsible for providing the appropriate step sequence to the H-bridge driver, managing the timing of the step pulses, and responding to current sensing feedback as well as any error conditions.

<section id="gallery2" style="overlayColor: ">
<div class="row 25%">
    <article class="4u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/H_bridge_isometric_view.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/H_bridge_isometric_view.jpeg" alt="" /></a>
        <p style="text-align: center;">a) H-bridge circuit, iso/top view</p>
    </article>
     <article class="4u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/H_bridge_top.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/H_bridge_top.jpeg" alt="" /></a>
        <p style="text-align: center;">b) H-bridge circuit, top view</p>
    </article>
    <article class="4u$ 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/H_bridge_bottom.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/H_bridge_bottom.jpeg" alt="" /></a>
        <p style="text-align: center;">c) H-bridge circuit, bottom view</p>
    </article>
    <article class="4u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/MCU_iso_view.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/MCU_iso_view.jpeg" alt="" /></a>
        <p style="text-align: center;">d) MCU circuit, iso/top view</p>
    </article>
     <article class="4u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/MCU_top.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/MCU_top.jpeg" alt="" /></a>
        <p style="text-align: center;">e) MCU circuit, top view</p>
    </article>
    <article class="4u$ 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/aux_circuit_iso.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/aux_circuit_iso.jpeg" alt="" /></a>
        <p style="text-align: center;">f) Auxiliary circuit, iso-view</p>
    </article>
    <p id="Figure 9"><b>Figure 9: </b>gallery of system sub-circuits</p>
</div>
</section>

#### H-bridge + Driver Highlights ####

The H-bridge circuit was designed with performances highlighted below:

<ul>
<li>0-95% at 20kHz & 100% Duty cycle of High-side MOSFETs</li>
<li>Protection features: OV/UV, OC, SC, OT, RPP, shoot-thru </li>
<li>7.5 ~ 34V operating range</li>
<li>Each MOSFET capable of up to 110A continuous*
</li>
</ul>
<p style="font-size:0.75em;">*Refer to appendix on MOSFET selection</p>

#### H-bridge Driver: Overview ####

The overall circuit is based on TLE7182EM datasheet recommendation (Figure 10). TLE7182EM from Infineon Technologies was chosen for its convenient set of features, including:

<ul>
<li>Independent MOSFET controls</li>
<li>Integrated analog current-feedback</li>
<li>Integrated protection features</li>
</ul>

<section id="gallery3" style="overlayColor: ">
<div class="row 25%">
    <article class="12u$ 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sch0.jpg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sch0.jpg" alt="" /></a>
        <p style="text-align: center;">a) Recommended application diagram </p>
    </article>
     <article class="3u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sch0_1.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sch0_1.jpeg" alt="" /></a>
        <p style="text-align: center;">b) H-bridge</p>
    </article>
    <article class="3u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sch0_2.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sch0_2.jpeg" alt="" /></a>
        <p style="text-align: center;">c) Reverse-polarity protection</p>
    </article>
    <article class="3u 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sch0_3.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sch0_3.jpeg" alt="" /></a>
        <p style="text-align: center;">d) Charge pump</p>
    </article>
     <article class="3u$ 12u$(xsmall) work-item" style="margin-bottom: 0.5em;">
        <a href="/images/fulls/cnc/sch0_4.jpeg" class="image fit thumb" style="margin: 0.35em auto;"><img src="/images/fulls/cnc/sch0_4.jpeg" alt="" /></a>
        <p style="text-align: center;">e) Low-side current feedback</p>
    </article>
    <p id="Figure 10"><b>Figure 10: </b>TLE7182EM: application recommendation <a href="#references"><sup>[2]</sup></a></p>
</div>
</section>

<p>
<b>Figure 10b: </b>4 \(\times \) external MOSFETs per H-bridge with RC turn-off snubber. (Refer to appendix for discussion on MOSFET selection). <br>
<b>Figure 10c: </b>1 \(\times \) external MOSFET for reverse battery-polarity protection. This is a necessary feature to protect a MOSFET based H-bridge against critical operator error: reverse battery polarity. The controlling element here is an NMOS, which is significantly more power efficient than an in-line diode and more cost effective than a PMOS implementation. The main tradeoff is the complexity of implementation, particularly, an NMOS in this placement requires a charge pump to deliver driving voltages above the rail voltage. TLE7182EM has an integrated charge pump specifically for this. A minor note on the BJT and its accompanying diode: the diode is necessary here to prevent an unplanned avalanche breakdown across the Emitter-Base junction.<br>
<b>Figure 10d: </b>charge pumps reference source voltage of high-side MOSFETs such that the gates of the high-side MOSFETs can be switched robustly. <br>
<b>Figure 10e: </b>integrated op-amp for current feedback.
</p>

Using the design recommendation, I designed the following circuit (Figure 11). The physical prototype can be seen in Figure 9b. 

<div>
<img style="margin-bottom: 0" id="Figure 11" src="/images/fulls/cnc/starting_schematic.png" class="fit image">
<p><b>Figure 11: </b>actual schematic</p>
</div>

There are a few keypoints to take note of regarding the above circuit:
<ol>
<li>This circuit has an additional reverse battery polarity protection implemented through diode D2. Through bench testing, it does not seem that TLE7182EM itself is protected against reverse polarity conditions. This added diode contributes to a minor increase to power dissipation and the minimum operating voltage of the circuit, but ensures that the IC is not damaged in the event of reverse battery polarity.</li>
<li>The RC-snubber is critical to managing MOSFET 'ringing' during turn-off. However, the actual values for them cannot be easily calculated during design, as they depend (in part) on parasitic inductances and capacitances within a physical construction. Therefore, they need to be determined empirically.</li>
<li>RC filter implement on the analog output of this circuit feeds into the controlling MCU, which may or may not use an ADC to handle the signal. This RC filter in fact might not be necessary if an ADC is not used. This is a topic of later discussion.</li>
</ol>

At this point, we should also briefly discuss the drive sequence for the external H-bridges. For this initial discussion, we refer to Figure 12.

<div>
<img style="margin-bottom: 0" id="Figure 12" src="/images/fulls/cnc/initial_drive_sequence.jpg" class="fit image">
<p><b>Figure 12: </b>drive sequence overview <a href="#references"><sup>[3]</sup></a></p>
</div>

Figure 12 illustrates a single winding of a stepper motor being switched ON & OFF. During the "on" phase, the motor winding is first activated by turning on Q1 and Q4. During the "off" phase, the current flowing through the winding is diverted through Q2 and Q4, such that it circulates in the low-side of the H-bridge. This type of drive sequence is called "slow-decay" or "free-wheeling", as the circulating current in the "off" phase takes on a slow exponential decay, dissipating through the resistances within the winding and low-side switches. The resulting waveforms can be seen on the right side of the image, where the current is shown rising and falling during the "on" and "off" phases. The goal of this switching scheme is to maintain the average current around some target current. In addition, by turning on the two low-side switches during the "off" phase, back EMF from the motor is managed and ripple voltages on the rails are minimized. Using the low-side switches is slightly preferred over the high-side switches for the "off" phase, as the low-side switches do not require charge pumps to operate.

A bipolar stepper motor has a minimum of two sets of windings to achieve sequential steps. In order to actuate the stepper motors used in this project, each motor is controlled by two H-bridges and the order of actuation is 'staggered' to achieve sequential steps. In the simplest mode, the motors are activated at "full step", which is the coarsest but most robust method of driving a stepper motor. Further fractional steps may be achieved by moving the rotor partial way between full steps. In essence, the two windings are actuated at 90&#176; out-of-phase from each other. With further discretization of the drive sequence, the sequence is effectively two sine waves, 90&#176;out-of-phase from each other &#151; hence, the name "wave drive". Figure 13 shows the target currents w.r.t time for the two windings inside the stepper motor.   

<div>
<img style="margin-bottom: 0" id="Figure 13" src="/images/fulls/cnc/MP6500_microstepping1.jpeg" class="fit image">
<p><b>Figure 13: </b>target winding currents <a href="#references"><sup>[4]</sup></a></p>
</div>

#### Basic Implementation: Results ####

Using the described methods and low-side current sensing, the results of the implemented circuit can be seen below (Figure 14).

<div>
<img style="margin-bottom: 0" id="Figure 14" src="/images/fulls/cnc/chopper_waveform.jpg" class="fit image">
<p><b>Figure 14: </b>{ Ch1: Q1 \(\overline{V}_{G}\) &#8197; Ch2: Low-side \(i_{sense}\) }</p>
</div>

Here, channel 1 shows the (inverted) gate signal \\\(\overline{V}_{G}\\\) on high-side MOSFET Q1. Overlaid, in channel 2, is the analog measurement output of the low-side sense resistor. We can see that during the "on" phase, the winding current is able to rise until it reaches a pre-set level. Once the current surpasses the pre-set limit, the gate signal is switched, and the system enters the "off" phase, effectively limiting the rising current. An internal clock triggers the "on" phase in the following period, and the cycle repeats. 

Figure 15 shows an in-line measurement of the winding current during a wave-drive sequence. 

<div>
<img style="margin-bottom: 0" id="Figure 15" src="/images/fulls/cnc/wave_drive0.jpeg" class="fit image">
<p><b>Figure 15: </b>{ Ch1: \(I_{motor}\) }</p>
</div>

The results from the basic implementation show that the baseline performance is quite good. The waveform shown in Figure 15 exhibits good fidelity, with minimum distortion on the target sinusoidal waveform.

#### Deep Dive: Current Sensing ####

In the following sections, I will do a deep dive on the subject of current sensing, as this is a critical part of the working circuit. I will be analyzing the basic implementation and how it can be improved to yield an improved system.




... more


### References ### 

<ol style="font-size:0.75em; ">
    <li>STMicroelectronics, “Stepper-Motor Performance Constant-Current Chopper Driver UPS”, AN468 Application Note, December 2003.</li>
    <li>Infineon Technologies AG, "TLE7182EM H-Bridge and Dual Half Bridge Driver IC", Rev 1.1, September 2010.</li>
    <li>Modular Circuits, http://modularcircuits.tantosonline.com/blog/articles/h-bridge-secrets/sign-magnitude-drive/</li>
    <li>Monolithic Power Systems, "MP6500 35V, 2.5A, Stepper Motor Driver", Rev 1.0, June 2017.</li>
    <li>eeNews Europe, “Improving current control for Better Stepper Motor Motion Quality,”, https://www.eenewseurope.com/en/improving-current-control-for-better-stepper-motor-motion-quality/, February 2016.</li>
</ol>
