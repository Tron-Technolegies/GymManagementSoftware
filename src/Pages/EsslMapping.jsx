import React, { useEffect, useState } from "react";

import useEsslMappings from "../hooks/useEsslMappings";
import EsslHeader from "../Components/Essl/EsslHeader";
import EsslKPIs from "../Components/Essl/EsslKPIs";
import EsslTable from "../Components/Essl/EsslTable";
import Pagination from "../Components/Pagination";

export default function EsslMapping() {
    const essl = useEsslMappings();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalItems = essl.filteredMappings.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedMappings = essl.filteredMappings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset pagination when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [essl.search, essl.filter]);

    // Keep the current page valid when mappings change
    useEffect(() => {
        if (totalItems === 0) {
            if (currentPage !== 1) setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalItems, totalPages]);

    return (
        <div className="min-h-full bg-slate-50 p-4 md:p-6">
            <EsslHeader
                search={essl.search}
                setSearch={essl.setSearch}
                filter={essl.filter}
                setFilter={essl.setFilter}
                syncing={essl.syncing}
                loading={essl.loading}
                onSync={essl.syncEmployees}
                message={essl.message}
                error={essl.error}
                dismissMessage={essl.dismissMessage}
                dismissError={essl.dismissError}
            />

            <EsslKPIs
                counts={essl.counts}
                loading={essl.loading}
            />

            <EsslTable
                mappings={paginatedMappings}
                members={essl.members}
                staffs={essl.staffs}
                loading={essl.loading}
                savingId={essl.savingId}
                selectedTypes={essl.selectedTypes}
                setSelectedTypes={essl.setSelectedTypes}
                selectedPeople={essl.selectedPeople}
                setSelectedPeople={essl.setSelectedPeople}
                onLink={essl.linkPerson}
                onUnlink={essl.unlinkPerson}
                onRefresh={essl.loadData}
            />

            <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}