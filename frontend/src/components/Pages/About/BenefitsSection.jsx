import React from "react"

const BenefitsSection = () => {
  const benefits = [
    "User-friendly platform",
    "Diverse job listings",
    "Personalized job matches",
    "Career resources and advice",
    "Efficient application process",
    "Transparent company profiles",
    "Regular updates and notifications",
    "Dedicated customer support",
  ]

  return (
    <div className="bg-[#433a3f] text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose HIREBUS?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div key={index} className="bg-[#3d5a6c] p-4 rounded-lg text-center flex justify-center items-center">
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitsSection

