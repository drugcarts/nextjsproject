import Link from "next/link";

const FilterCompanyCard = () => {
  const companys = [
    { id: 1, name: "Hetero drugs limited",url: "/manufacturer/hetero-drugs-limited" },
    { id: 2, name: "Natco pharma ltd",url: "/manufacturer/natco-pharma-ltd"  },
    { id: 3, name: "Dr reddys laboratories ltd",url: "/manufacturer/dr-reddys-laboratories-ltd"  },
    { id: 4, name: "Emcure pharmaceuticals ltd",url: "/manufacturer/emcure-pharmaceuticals-ltd"  },
    { id: 5, name: "Mylan pharmaceuticals",url: "/manufacturer/mylan-pharmaceuticals"  },
    { id: 6, name: "Cipla ltd",url: "/manufacturer/cipla-ltd"  },
    { id: 7, name: "Cadila healthcare ltd",url: "/manufacturer/cadila-healthcare-ltd"  },
    { id: 8, name: "Strides shasun limited",url: "/manufacturer/strides-shasun-limited"  },
    { id: 9, name: "Sun pharmaceutical industries limited",url: "/manufacturer/sun-pharmaceutical-industries-limited"  },
    { id: 10, name: "Biocon",url: "/manufacturer/biocon"  },
    { id: 11, name: "Lupin ltd",url: "/manufacturer/lupin-ltd"  },
    { id: 12, name: "Alkem laboratories limited",url: "/manufacturer/alkem-laboratories-limited"  },
    { id: 13, name: "Aprazer healthcare pvt ltd",url: "/manufacturer/aprazer-healthcare-pvt-ltd"  },
    { id: 14, name: "Wockhardt ltd",url: "/manufacturer/wockhardt-ltd"  },
    { id: 15, name: "Zuventus healthcare ltd",url: "/manufacturer/zuventus-healthcare-ltd"  },
  ];

  return (
    <>
      <div className="text-center bg-[#35A24D] p-2 mt-10 border-b-2 px-4">
        <h2 className="text-xl text-white font-bold ps-7">
          Filter By Company
        </h2>
      </div>
      <div className="items-center justify-start gap-2 border-[1.5px] mb-10 h-[50vh] overflow-auto">
        {companys.map((company, i) => (
          <div className="py-3 border-b-[1.5px] pb-2" key={i}>
            <Link href={company?.url}>
              <h3 className="font-bold text-sm ml-2">{company?.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default FilterCompanyCard;
